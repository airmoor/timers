import React, {useState} from "react";
import { ReactComponent as RemoveIcon } from './../assets/icons/remove.svg';
import { ReactComponent as EditIcon } from './../assets/icons/edit.svg';
import { ReactComponent as PlusIcon } from './../assets/icons/plus.svg';
import './Timer.scss';
import './../style/style.scss';

interface Timer {
    name: string,
    hour: string,
    minute: string,
    second: string,
    millisecond: string,
    isRunning: boolean,
    isSet: boolean,
    id: string
}

const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function Timer() {
    const initialTimer: Timer = {
        name: 'Timer',
        hour: '00',
        minute: '00',
        second: '00',
        millisecond: '00',
        isRunning: false,
        isSet: false,
        id: uid()
    }

    const [timers, setTimers] = useState<Array<Timer>>([initialTimer]);

    const handleChange = (idx: number, event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (event.target.name !== 'name') {
            value = value.slice(0, 2);
        }

        let newTimers = [...timers];
        newTimers[idx] = {
            ... timers[idx],
            [event.target.name]: value
        };

        const fullTime = Number(newTimers[idx].hour + newTimers[idx].minute + newTimers[idx].second + newTimers[idx].millisecond);
        newTimers[idx].isSet = Boolean(fullTime);

        setTimers(newTimers);
    }

    const startPause = (idx: number) => {
        let newTimers = [...timers];
        const isRunning = !timers[idx].isRunning;

        newTimers[idx] = {
            ...timers[idx],
            isRunning
        };

        setTimers(newTimers);
    }

    const resetTimer = (idx: number) => {
        let newTimers = [...timers];
        newTimers[idx] = initialTimer;

        setTimers(newTimers);
    }

    const addTimer = () => {
        setTimers([
            ...timers,
            initialTimer
        ]);
    }

    const removeTimer = (idx: number) => {
        let newTimers = [...timers];
        newTimers.splice(idx, 1);

        setTimers(newTimers);
    }

    return (
        <div>
            {
                timers.map((timer, idx) => {
                    return (
                        <section key={idx} className="mb-lg">
                            <form className="timer__form">
                                <span className="timer__value">
                                    <input type="number" min="00" max="23" placeholder="00"
                                           onChange={(e) => handleChange(idx, e)}
                                           value={timer.hour} size={2}
                                           name="hour"/>:
                                    <input type="number" min="00" max="59" placeholder="00"
                                           onChange={(e) => handleChange(idx, e)}
                                           value={timer.minute} size={2}
                                           name="minute"/>:
                                    <input type="number" min="00" max="59" placeholder="00"
                                           onChange={(e) => handleChange(idx, e)}
                                           value={timer.second} size={2}
                                           name="second"/>.
                                    <input type="number" min="00" max="99" placeholder="00"
                                           onChange={(e) => handleChange(idx, e)}
                                           value={timer.millisecond} size={2} name="millisecond"/>
                                </span>

                                <span>
                                    <button type="button" className="primary"
                                            onClick={() => startPause(idx)}>
                                        {timer.isRunning ? 'pause' : 'start'}
                                    </button>
                                    <button type="button" className={timer.isSet && timer.isRunning ? "primary" : "disabled"}
                                            onClick={() => resetTimer(idx)}>
                                        reset
                                    </button>
                                </span>
                            </form>

                            <div className="timer__text">
                                <span>
                                     <input type="text" size={Number(timer.name.length)}
                                            onChange={(e) => handleChange(idx, e)}
                                            value={timer.name} name="name"/>
                                     <EditIcon className="ml-sm"/>
                                </span>

                                <span className="timer__remove" onClick={() => removeTimer(idx)}>
                                    remove
                                    <RemoveIcon className="ml-sm"/>
                                </span>
                            </div>
                            <hr/>
                        </section>
                    )
                })
            }


            <div onClick={addTimer} className="timer__new">
                <PlusIcon className="mr-sm"/>
                add more timer
            </div>
        </div>
    );
}

export default Timer;