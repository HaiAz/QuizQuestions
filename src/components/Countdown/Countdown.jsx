import React, { useEffect, useState } from "react";

function Countdown({ startAt, endAt, finish }) {
    const remainingTime = +endAt - +startAt;
    const [timeLeft, setTimeLeft] = useState(remainingTime);
    // const minutes = Math.floor(remainingTime / 60) % 60;
    // const seconds = Math.floor(remainingTime) % 60;

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                const newTimeLeft = prevTimeLeft - 1;
                if (newTimeLeft === 0) {
                    clearInterval(interval);
                }
                return newTimeLeft;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatMinutes = (Math.floor(timeLeft / 60) % 60).toString().padStart(2, "0");
    const formatSeconds = Math.floor(timeLeft % 60)
        .toString()
        .padStart(2, "0");
    if (formatMinutes <= 0 && formatSeconds <= 0) {
        finish();
    }

    return (
        <div className="w-28 h-10 bg-blue-300 rounded-full flex justify-center items-center font-semibold font-mono">
            <span>
                {formatMinutes}:{formatSeconds}
            </span>
        </div>
    );
}

export default Countdown;
