import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react"

function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() { 
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let min = Math.floor(elapsedTime / (1000 * 60) % 60);
        let sec = Math.floor(elapsedTime / (1000) % 60);
        let millisec = Math.floor((elapsedTime % 1000) / 10);

        min = String(min).padStart(2, "0");
        sec = String(sec).padStart(2, "0");
        millisec = String(millisec).padStart(2, "0");
        return `${min}:${sec}:${millisec}`;
    }


    return(<div className="stopwatch-container">
        <h1 className="stopwatch-time">{formatTime()}</h1>
        <div className="stopwatch-buttons">
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={reset}>Reset</button>
        </div>
    </div>)
}
export default Stopwatch