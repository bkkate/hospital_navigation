import React from "react";
import { useState, useEffect } from "react";
import "../../style/Timepicker.css";

const Timepicker = ({ onTimeChange }) => {
  const [hour, setHour] = useState(8);
  const [min, setMin] = useState("00");
  const [period, setPeriod] = useState("AM");

  const hoursOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
    (hour, index) => {
      return (
        <option key={index} value={hour}>
          {hour}
        </option>
      );
    }
  );
  const minsOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
    (min, index) => {
      return (
        <option key={index} value={min}>
          {min === 0 || min === 5 ? `0${min}` : min}
        </option>
      );
    }
  );

  const setNewData = (event) => {
    const { name, value } = event.target;

    if (name === "hour") {
      setHour(value);
    } else if (name === "min") {
      setMin(value);
    } else if (name === "period") {
      setPeriod(value);
    }
  };

  /* use useEffect to handle side effects when hour, min, or period changes 
  with the lag from updating state when directly using onTimeChange within setNewData after setting new state*/

  useEffect(() => {
    // pass on the default value to AppointmentBar component, to take care of when user doesn't click anything;
    onTimeChange(hour, min, period);
  }, [hour, min, period]); // Dependencies array ensures onTimeChange runs when these change
  // with any changes to hour, min, period, onTimeChange will be called only AFTER the state is actually updated!

  return (
    <div className="time-picker">
      <div className="hour">
        <select name="hour" value={hour} defaultValue={8} onChange={setNewData}>
          {hoursOptions}
        </select>
      </div>
      :
      <div className="min">
        <select
          name="min"
          value={min}
          onChange={setNewData}
          defaultValue={"00"}
        >
          {minsOptions}
        </select>
      </div>
      <div className="period">
        <select name="period" value={period} onChange={setNewData}>
          <option value="AM"> AM </option>
          <option value="PM"> PM </option>
        </select>
      </div>
    </div>
  );
};

export default Timepicker;
