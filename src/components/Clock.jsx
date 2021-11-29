import React, { useEffect } from "react";
import './styles/styles.scss';

const Clock = (props) => {
  const { timeNow, setTimeNow } = props;

  const getTime = () => {
    var d = new Date();
    function convertTZ(date, tzString) {
      return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
    }
    const converted = convertTZ(d, 'Asia/Manila')
    return converted.toTimeString().slice(0, 5)
  }

  useEffect(() => {
    setInterval(() => {
      setTimeNow(getTime)
    }, 1000);
  }, []);



  return (
    <div className="clock">
      <div data-testid="clock-text" className="clock-text">
        {timeNow}
      </div>
    </div>
  );
}

export default Clock;