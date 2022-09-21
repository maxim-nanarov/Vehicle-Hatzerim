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
        console.log(res.data);
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
        console.log(res.data);
        setReasons(res.data);
      });
  }, []);
  let count = 0;

  let a = Destinations.map((Destination) => {
    count++;
    console.log(Destination);
    return (
      <>
        <option>{Destination.destination_name}</option>
      </>
    );
  });

  let b = Reasons.map((Reason) => {
    count++;
    console.log(Reason);
    return (
      <>
        <option>{Reason.reason_name}</option>
      </>
    );
  });
  let currentDate = new Date().toISOString().split("T")[0];
  console.log(currentDate);
  return (
    <>
      <div className="MainDivGetV">
        <div className="signUpDiv">
          <div className="dateDiv">
            <label>Start: </label>
            <div>
              <input
                value={currentDate}
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
                value={currentDate}
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
            <input type="checkBox"></input>
          </div>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </div>
    </>
  );
}
