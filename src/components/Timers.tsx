import React, {useState} from "react";
import {ReactComponent as PlusIcon} from './../assets/icons/edit.svg';
import Timer from "./Timer";
import {uid} from "../utils/utils";
import styles from './Timers.module.scss';

function Timers() {

    const [timerIds, setTimerIds] = useState<Array<string>>([uid()]);

    const addTimer = () => {
        const newTimerIds = [...timerIds];
        newTimerIds.push(uid());
        setTimerIds(newTimerIds);
    }

    const onRemove = (id: string) => {
        let newTimerIds = [...timerIds];
        const newTimerIndex = newTimerIds.findIndex(timerId => timerId === id);
        newTimerIds.splice(newTimerIndex, 1);

        setTimerIds(newTimerIds);
    }

    return (
        <>
            {timerIds.map((id) => {
                return <Timer onRemove={() => onRemove(id)} key={id}/>
            })}

            <div onClick={addTimer} className={styles.new}>
                <PlusIcon className="mr-sm"/>
                add more timer
            </div>
        </>
    );
}

export default Timers;