import React, { useEffect, useState } from "react";
import "./Get_vehicle.scss";
import axios from "axios";

export default function GetVehicle() {
  const [startingDate, setStartingDate] = useState();
  const [EndingDate, setEndingDate] = useState();
  const [startingHour, setStartingHour] = useState();
  const [EndingHour, setEndingHour] = useState();
  const [Destinations, setDestinations] = useState([]);
  const [Reasons, setReasons] = useState([]);
  const [citys, setCity] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=10000"
      )
      .then(function (response) {
        // handle success
        setCity(response.data.result);
      })
      .catch(function (error) {
        console.log("handle error");
        console.log(error);
      });

    axios
      .get("https://vehicle-hatzerim.herokuapp.com/Destinations", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDestinations(res.data);
      });

    axios
      .get("https://vehicle-hatzerim.herokuapp.com/reasons", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setReasons(res.data);
      });
  }, []);
  let count = 0;

  let a = Destinations.map((Destination) => {
    count++;
    return (
      <>
        <option>{Destination.destination_name}</option>
      </>
    );
  });

  let b = Reasons.map((Reason) => {
    count++;
    return (
      <>
        <option>{Reason.reason_name}</option>
      </>
    );
  });
  let currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    let time = new Date();
    setStartingDate(new Date().toDateString());
    setStartingHour(new Date().toTimeString().slice(0, 8));
    setEndingDate(new Date().toDateString());
    setEndingHour(new Date().toTimeString().slice(0, 8));
  }, [startingDate, startingHour]);

  return (
    <>
      <div className="MainDivGetV">
        <form id="AddForm" onSubmit={onSubmit}>
          <div className="signUpDiv">
            <div className="dateDiv">
              <label>Start: </label>
              <div>
                <input
                  id="Starting_Date"
                  name="Starting_Date"
                  value={currentDate}
                  type="date"
                  onChange={(e) => setStartingDate(e.target.value)}
                />
                <input
                  id="Starting_Hour"
                  name="Starting_Hour"
                  type="time"
                  value={startingHour}
                  onChange={(e) => setStartingHour(e.target.value)}
                />
              </div>
            </div>
            <div className="dateDiv">
              <label>finish: </label>
              <div>
                <input
                  id="Ending_Date"
                  name="Ending_Date"
                  type="date"
                  onChange={(e) => setEndingDate(e.target.value)}
                  value={currentDate}
                />
                <input
                  id="Ending_Hour"
                  name="Ending_Hour"
                  type="time"
                  value={EndingHour}
                  onChange={(e) => setEndingHour(e.target.value)}
                />
              </div>
            </div>
            <div className="ChooseTypeVhicle">
              <div>
                <label>Destination: </label>
                <select name="Destination" id="Destination">
                  {a}
                </select>
              </div>
              <div>
                <label>Reason</label>
                <select name="cars" id="cars">
                  {b}
                </select>
              </div>
            </div>
            <div>
              <label>Will you take riders?</label>
              <input
                name="Take_Riders"
                id="Take_Riders"
                type="checkBox"
              ></input>
            </div>
          </div>
          <div>
            <button form="AddForm" type="submit" value="Submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );

  function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);
    if (formData.Take_Riders === undefined) {
      formData.Take_Riders = false;
    } else {
      formData.Take_Riders = true;
    }
    //To Do: put form Data to an post request to the Rides server
    console.log(formData);
  }
}
