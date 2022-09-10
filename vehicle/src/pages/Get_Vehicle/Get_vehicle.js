import React, { useEffect, useState } from "react";
import "./Get_vehicle.scss";

export default function GetVehicle() {
  const [startingDate, setStartingDate] = useState();
  const [EndingDate, setEndingDate] = useState();
  const [startingHour, setStartingHour] = useState();
  const [EndingHour, setEndingHour] = useState();
  useEffect(() => {
    console.clear();
    console.log("starting Date: " + startingDate);
    console.log("starting Hour: " + startingHour);
    console.log("Ending Date: " + EndingDate);
    console.log("Ending Hour: " + EndingHour);
  });

  return (
    <>
      <div className="MainDivGetV">
        <div className="signUpDiv">
          <div className="dateDiv">
            <label>Start: </label>
            <div>
              <input
                type="date"
                onChange={(e) => setStartingDate(e.target.value)}
              />
              <input
                type="time"
                onChange={(e) => setStartingHour(e.target.value)}
              />
            </div>
          </div>
          <div className="dateDiv">
            <label>finish: </label>
            <div>
              <input
                type="date"
                onChange={(e) => setEndingDate(e.target.value)}
              />
              <input
                type="time"
                onChange={(e) => setEndingHour(e.target.value)}
              />
            </div>
          </div>
          <div className="ChooseTypeVhicle">
            <div>
              <label>Destination: </label>
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div>
              <label>Reason</label>
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </div>
    </>
  );
}
