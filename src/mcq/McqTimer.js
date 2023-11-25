import React, { useEffect, useState } from "react";

const Timer = ({ time, setNxtQues, nxtQues }) => {
  const [clock, setClock] = useState(time);

  useEffect(() => {
    if (["c", "w"].includes(nxtQues)) {
      setClock(clock);
      return;
    } else if (clock === 0) {
      setNxtQues("t");
      return;
    }
    const interval = setInterval(() => {
      setClock((previous) => previous - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setNxtQues, nxtQues, clock]);

  return <div className="mcq_rounds_timer">{clock}</div>;
};

export default Timer;
