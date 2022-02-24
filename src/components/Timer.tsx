import React, {useState} from "react";
import EditIcon from './../assets/icons/edit.svg';
import PlusIcon from './../assets/icons/plus.svg';
import './Timer.scss';
import './../style/style.scss';

interface Time {
    hour: string,
    minute: string,
    second: string,
    millisecond: string
}

function Timer() {

    const [time, setTime] = useState<Time>({
        hour: '00',
        minute: '00',
        second: '00',
        millisecond: '00',
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setTime({
            ...time,
            [event.target.name]: value.slice(0, 2)
        });
    }

    return (
        <div>
            <section className="mb-lg">
                <form className="timer__form">
                    <span className="timer__value">
                        <input type="number" min="00" max="23" placeholder="00" onChange={handleChange}
                               value={time.hour}
                               name="hour"/>:
                        <input type="number" min="00" max="59" placeholder="00" onChange={handleChange}
                               value={time.minute}
                               name="minute"/>:
                        <input type="number" min="00" max="59" placeholder="00" onChange={handleChange}
                               value={time.second}
                               name="second"/>.
                        <input type="number" min="00" max="99" placeholder="00" onChange={handleChange}
                               value={time.millisecond} name="millisecond"/>
                    </span>

                    <span>
                        <button className="primary"> start </button>
                        <button className="disabled"> reset </button>
                    </span>
                </form>

                <div className="timer__text">
                    <span>timer 1</span>
                    <img className="ml-sm" src={EditIcon} alt="Edit"/>
                </div>
                <hr/>
            </section>

            <div className="timer__text">
                <img className="mr-sm" src={PlusIcon} alt="New"/>
                add more timer
            </div>
        </div>
    );
}

export default Timer;