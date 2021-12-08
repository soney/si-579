import React, { useState } from "react";

/**
 * A widget for configuring the lemon timer
 */

export type IntervalConfigProps = {
    workInterval: number, // How long a work interval should be (usually in minutes)
    breakInterval: number, // How long a break interval should be (usually in minutes)
    onChangeWorkInterval: (newWorkInterval: number) => void, // A callback to be called when the user changes the work interval
    onChangeBreakInterval: (newBreakInterval: number) => void, // A callback to be called when the user changes the break interval
}

const IntervalConfigDisplay: React.FC<IntervalConfigProps> = ({workInterval: initialWorkInterval, breakInterval: initialBreakInterval, onChangeWorkInterval, onChangeBreakInterval }) => {
    const [workInterval,  setWorkInterval]  = useState(initialWorkInterval);  // Current value for work interval
    const [breakInterval, setBreakInterval] = useState(initialBreakInterval); // Current value for break interval

    const onWorkIntervalChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(ev.target.value);
        setWorkInterval(newValue);
        onChangeWorkInterval(newValue);
    };

    const onBreakIntervalChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(ev.target.value);
        setBreakInterval(newValue);
        onChangeBreakInterval(newValue);
    };

    return <form className="form-inline row">
                <div className="col-md-3" />
                <div className="col-md-3">
                    <label htmlFor="work-len">work interval (minutes):</label>
                    <input className="form-control" min={1} max={2*60} type="number" id="work-len" value={workInterval||''} onChange={onWorkIntervalChange}></input>
                </div>
                <div className="col-md-3">
                    <label htmlFor="break-len">break interval (minutes):</label>
                    <input className="form-control" min={1} max={2*60} type="number" id="break-len" value={breakInterval||''} onChange={onBreakIntervalChange}></input>
                </div>
                <div className="col-md-3" />
            </form>;
};

export default IntervalConfigDisplay;