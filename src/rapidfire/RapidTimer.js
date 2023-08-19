import React, { useEffect, useState } from "react";

const Timer = ({ time, setTimer }) => {
  const [clock, setClock] = useState(time);

  useEffect(() => {
    if (clock === 0) {
      setTimer("timeout");
      return;
    }
    const interval = setInterval(() => {
      setClock((previous) => previous - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setTimer, clock]);

  return <div className="mcq_rounds_timer">{clock}</div>;
};

export default Timer;
