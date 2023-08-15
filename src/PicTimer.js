import React, { useEffect, useState } from "react";

const Timer = ({ time, setNxtPic }) => {
  const [clock, setClock] = useState(time);

  useEffect(() => {
    if (clock === 0) {
      setNxtPic("True");
      return;
    }
    const interval = setInterval(() => {
      setClock((previous) => previous - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setNxtPic, clock]);

  return <div className="mcq_rounds_timer">{clock}</div>;
};

export default Timer;
