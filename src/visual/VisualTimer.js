import React, { useEffect, useState } from "react";
import useSound from "use-sound";

const Timer = ({ time, setNxtQues, nxtQues }) => {
  const [clock, setClock] = useState(time);

  const [wrongAns] = useSound("mcq/wrong.mp3");

  useEffect(() => {
    if (["c", "w"].includes(nxtQues)) {
      setClock(clock);
      return;
    } else if (clock === 0) {
      wrongAns();
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
