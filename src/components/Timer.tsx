import React, {useEffect, useState} from "react";
import {ReactComponent as RemoveIcon} from './../assets/icons/remove.svg';
import {ReactComponent as EditIcon} from './../assets/icons/edit.svg';
import {addAdditionalNulls} from "../utils/utils";
import './Timer.scss';
import './../style/style.scss';

//todo add validation (min, sec)
//todo fix cursor and auto set to the next

interface Timer {
    name: string,
    hour: string,
    minute: string,
    second: string,
    millisecond: string,
    isRunning: boolean,
    isSet: boolean,
    timerId?: number
}

interface TimerProps {
    onRemove: Function
}

function Timer(props: TimerProps) {
    const generateInitialTimer = (): Timer => ({
        name: 'Timer',
        hour: '00',
        minute: '00',
        second: '00',
        millisecond: '00',
        isRunning: false,
        isSet: false
    });

    const [timer, setTimer] = useState<Timer>(generateInitialTimer());

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!timer.isRunning) {
            let value = event.target.value;
            if (event.target.name !== 'name') {
                value = addAdditionalNulls(value.slice(0, 2));
            }

            const newTimer = {
                ...timer,
                [event.target.name]: value
            };

            const fullTime = Number(newTimer.hour + newTimer.minute + newTimer.second + newTimer.millisecond);
            newTimer.isSet = Boolean(fullTime);

            setTimer(newTimer);
       }
    }

    const tickFunction = (distance: number, newTimer: Timer) => {
        const newHour = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const newMinute = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const newSecond = String(Math.floor((distance % (1000 * 60)) / 1000));
        const newMillisecond = String(Math.floor((distance % (1000)) / 10));

        newTimer.hour = addAdditionalNulls(newHour);
        newTimer.minute = addAdditionalNulls(newMinute);
        newTimer.second = addAdditionalNulls(newSecond);
        newTimer.millisecond = addAdditionalNulls(newMillisecond)

        setTimer({...newTimer});
    }

    const startPause = () => {
        const newTimer = {...timer}
        newTimer.isRunning = !newTimer.isRunning;
        if (!newTimer.isSet) {
            return;
        }

        let timerId: any; //todo set type
        if (newTimer.isRunning) {
            const startDateInMs = Date.now();
            const timeInIntervals: number = Number(newTimer.millisecond) * 10 + Number(newTimer.second) * 1000
                + Number(newTimer.minute) * 60000 + Number(newTimer.hour) * 3600000;
            const targetDate = startDateInMs + timeInIntervals;

            if (!timerId) {
                timerId = setInterval(() => {
                    const nowDate = new Date().getTime();

                    const distance = targetDate - nowDate;
                    if (distance > 0) {
                        tickFunction(distance, newTimer);
                    } else {
                        clearInterval(timerId);
                        resetTimer();
                    }
                }, 10);
            }

            newTimer.timerId = timerId;

            setTimer(newTimer);
        } else {
            if (newTimer.timerId) {
                clearInterval(newTimer.timerId);
                newTimer.timerId = undefined;
            }

            setTimer(newTimer);
        }
    }

    const resetTimer = () => {
        if (timer.isSet && !timer.isRunning) {
            const newTimer = {...timer};

            newTimer.hour = '00';
            newTimer.minute = '00';
            newTimer.second = '00';
            newTimer.millisecond = '00';
            newTimer.isRunning = false;
            newTimer.isSet = false;

            setTimer(newTimer);
        }
    }

    const removeTimer = () => {
        props.onRemove();
    }

    useEffect(() => {
        return () => {
            if (timer.timerId) {
                clearInterval(timer.timerId);
            }
        }
    }, []);

    return (
        <section className="mb-lg">
            <form className="timer__form">
                <span className="timer__value">
                    <input type="number" min="00" max="23" placeholder="00"
                           onChange={handleChange}
                           value={timer.hour} size={2}
                           readOnly={timer.isRunning}
                           name="hour"/>:
                    <input type="number" min="00" max="59" placeholder="00"
                           onChange={handleChange}
                           value={timer.minute} size={2}
                           readOnly={timer.isRunning}
                           name="minute"/>:
                    <input type="number" min="00" max="59" placeholder="00"
                           onChange={handleChange}
                           value={timer.second} size={2}
                           readOnly={timer.isRunning}
                           name="second"/>.
                    <input type="number" min="00" max="99" placeholder="00"
                           onChange={handleChange}
                           value={timer.millisecond} size={2}
                           readOnly={timer.isRunning}
                           name="millisecond"/>
                </span>

                <span>
                    <button type="button"
                            className={timer.isSet ? "primary" : "disabled"}
                            onClick={startPause}>
                        {timer.isRunning ? 'pause' : 'start'}
                    </button>
                    <button type="button"
                            className={timer.isSet && !timer.isRunning ? "primary" : "disabled"}
                            onClick={resetTimer}>
                        reset
                    </button>
                </span>
            </form>

            <div className="timer__text">
                <span>
                     <input type="text" size={Number(timer.name.length)}
                            onChange={handleChange}
                            readOnly={timer.isRunning}
                            value={timer.name} name="name"/>
                     <EditIcon className="ml-sm"/>
                </span>

                {
                    !timer.isRunning &&
                    <span className="timer__remove" onClick={() => removeTimer()}>
                        remove
                        <RemoveIcon className="ml-sm"/>
                    </span>
                }
            </div>
            <hr/>
        </section>
    );
}

export default Timer;