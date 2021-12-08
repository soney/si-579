import classNames from "classnames";
import { useEffect, useState } from "react";

export type LemonIconProps = {
    blinking?: boolean // if true, blink the lemon
}

const LemonIcon: React.FC<LemonIconProps> = ({blinking}) => {
    const [solid, setSolid] = useState<boolean>(true);

    useEffect(() => {
        if(blinking) {
            const interval = setInterval(() => {
                setSolid((s) => !s); // toggle whether solid
            }, 500);
            return () => { clearInterval(interval); } // return cleanup function
        }
    }, [blinking]);

    return <i className={classNames('lemon', 'fa-lemon', solid ? 'fa-solid' : 'fa-regular')} />;
}
export default LemonIcon;