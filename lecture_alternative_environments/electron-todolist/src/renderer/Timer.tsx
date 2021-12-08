import React, { useEffect, useState } from "react";

type CountdownTimerDisplayProps = {
    target: number,     // The timestamp that we are counting to
    onDone: () => void, // A callback when we have completed the countdown
}

const CountdownTimerDisplay: React.FC<CountdownTimerDisplayProps> = ({target, onDone}) => {
    const [remaining, setRemaining] = useState<number>(target - Date.now());
    useEffect(() => {
        const updateInterval = setInterval(() => {
            const timeLeft = target - Date.now();
            setRemaining(timeLeft);

            if(timeLeft <= 0) {
                clearInterval(updateInterval);
                onDone();
            }
        }, 1000);

        return () => clearInterval(updateInterval); // Cleanup function
    }, []);

    return <>{millisecondsToHumanString(remaining)}</>;
};

/**
 * This function converts a number of milliseconds into "human" time
 * 
 * @param ms The number of milliseconds
 * @returns A string of the form MM:ss (MM represents minutes, ss represents seconds)
 */
export function millisecondsToHumanString(ms: number): string {
    const totalSeconds = Math.round(ms/1000); // Convert millseconds to seconds

    const minutes = Math.floor(totalSeconds/60).toString().padStart(2, '0'); // padStart to ensure that if it's <10, we still display a leading 0
    const seconds = (totalSeconds%60).toString().padStart(2, '0'); // padStart to ensure we have a leading 0
    return `${minutes}:${seconds}`;
}

export default CountdownTimerDisplay;