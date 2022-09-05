import React from "react";

export default function GetVehicle() {
  return (
    <>
      <div>
        <div>
          <div>
            <label>Start: </label>
            <input type="date" />
            <input type="time" />
          </div>
          <div>
            <label>finish: </label>
            <input type="date" />
            <input type="time" />
          </div>
          <div>
            <label>Destination</label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <label>Reason</label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </div>
    </>
  );
}
