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
    return +(new Date()); // convert time to unix timesamp milliseconds
}

export let Timer = () => {
    let [startTime, setStartTime] = useState(calculateCurentTime());
    let [curentTime, setCurentTime] = useState(calculateCurentTime());
    let [timerHandle, setTimerHandle] = useState(0);

    let isRunning = timerHandle != 0;
    let totalElapsed = curentTime - startTime;
    let seconds = Math.floor(totalElapsed / 1000) % 60;
    let milliseconds = totalElapsed % 1000;
    
    let resetStopwatch = () => {
        setStartTime(calculateCurentTime());
        setCurentTime(calculateCurentTime());
    };

    let pauseStopwatch = () => {
        clearInterval(timerHandle);
        setTimerHandle(0);
    };

    let updateCurentTime = () => {
        setCurentTime(calculateCurentTime());
    }

    let startStopwatch = () => {
        if (timerHandle != 0) {
            // Timer already running
            return;
        }

        // reset the clock so when we start counting, we start from the time
        // on the display
        setStartTime(calculateCurentTime() - totalElapsed);
        updateCurentTime();

        // start the timer again
        let handle = setInterval(updateCurentTime, 23);

        // Save timer handle to pause can remove it
        setTimerHandle(handle);
    };

    useEffect(()=>{
        // this will start the timer and we need to remember to clear the 
        // timer when we are removed
        startStopwatch();

        return () => {
            clearInterval(timerHandle);
        };
    }, []);

    return <div>
        <p style={{fontSize:"3em", fontFamily:"monospace"}}>{format(seconds, 3)}.{format(milliseconds, 3)}</p>
        <button onClick={resetStopwatch}>Reset</button>
        {isRunning? <button onClick={pauseStopwatch}>Pause</button>
                  : <button onClick={startStopwatch}>Start</button> }
        </div>
};