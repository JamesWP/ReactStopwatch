import {useState, useEffect} from 'react'
import React from 'react'

function format(num, digs) {
    return num.toLocaleString("en-US", {
        minimumIntegerDigits: digs, 
        useGrouping: false,
        maximumFractionDigits:0

    });
}

function calculateCurentTime() {
    return +(new Date());
}

export let Timer = () => {
    let [startTime, setStartTime] = useState(calculateCurentTime());
    let [curentTime, setCurentTime] = useState(calculateCurentTime());
    let [timerHandle, setTimerHandle] = useState(0);

    let totalElapsed = curentTime - startTime;
    let seconds = totalElapsed / 1000 % 60;
    let milliseconds = totalElapsed % 1000;
    
    let resetStopwatch = () => {
        setStartTime(calculateCurentTime());
        setCurentTime(calculateCurentTime());
    };

    let pauseStopwatch = () => {
        clearInterval(timerHandle);
        setTimerHandle(0);
    };

    let startStopwatch = () => {
        let handle = setInterval(function (){
            setCurentTime(calculateCurentTime());
        }, 100);

        setTimerHandle(handle);
    };

    useEffect(()=>{
        startStopwatch();

        return () => {
            clearInterval(timerHandle);
        };
    }, []);

    return <div>
        {format(seconds, 3)}.{format(milliseconds, 3)}
        <button onClick={resetStopwatch}>Reset</button>
        <button onClick={pauseStopwatch}>Pause</button>
        <button onClick={startStopwatch}>Start</button>
        </div>
};