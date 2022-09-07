import React from "react";
import "./Get_vehicle.scss";

export default function GetVehicle() {
  return (
    <>
      <div className="MainDivGetV">
        <div className="signUpDiv">
          <div className="dateDiv">
            <label>Start: </label>
            <div>
              <input type="date" />
              <input type="time" />
            </div>
          </div>
          <div className="dateDiv">
            <label>finish: </label>
            <div>
              <input type="date" />
              <input type="time" />
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
