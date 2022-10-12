import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Get_vehicle.scss";
import axios from "axios";
//To Do: Add an Edit and Delete table.
export default function GetVehicle() {
  let { id } = useParams();
  const [Destinations, setDestinations] = useState([]);
  const [Reasons, setReasons] = useState([]);
  const [Rides, setRides] = useState([]);
  const [Vehicles, setVehicles] = useState([]);
  useEffect(() => {
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
      .get("https://vehicle-hatzerim.herokuapp.com/Rides", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRides(res.data);
      });

    axios
      .get("https://vehicle-hatzerim.herokuapp.com/vehicles", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setVehicles(res.data);
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
        <option key={count}>{Destination.destination_name}</option>
      </>
    );
  });
  count = 0;
  let b = Reasons.map((Reason) => {
    count++;
    return (
      <>
        <option key={count}>{Reason.reason_name}</option>
      </>
    );
  });

  return (
    <>
      <div className="MainDivGetV">
        <form id="AddForm" onSubmit={onSubmit}>
          <div className="signUpDiv">
            <div className="dateDiv">
              <label>Start: </label>
              <div>
                <div className="Seperator">
                  <input id="Starting_Date" name="Starting_Date" type="date" />
                </div>
                <div className="Seperator">
                  <input id="Starting_Hour" name="Starting_Hour" type="time" />
                </div>
              </div>
            </div>
            <div className="dateDiv">
              <label>finish: </label>
              <div>
                <div className="Seperator">
                  <input
                    id="Ending_Date"
                    name="Ending_Date"
                    type="date"
                    ata-date=""
                    data-date-format="DD MMMM YYYY"
                  />
                </div>
                <div className="Seperator">
                  <input id="Ending_Hour" name="Ending_Hour" type="time" />
                </div>
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
                <label>Reason: </label>
                <select name="Reason" id="Reason">
                  {b}
                </select>
              </div>
            </div>
            <div>
              <label>Will you take Hitch hickers?</label>
              <input
                className="CheckBoxHitchhickers"
                name="Take_Riders"
                id="Take_Riders"
                type="checkBox"
              ></input>
            </div>
            <div className="innerDiv">
              <button
                className="submitButton"
                form="AddForm"
                type="submit"
                value="Submit"
              >
                Submit
              </button>
            </div>
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
    //https://vehicle-hatzerim.herokuapp.com\
    let currentDate = new Date().toISOString().split("T")[0];
    let currentTime = new Date().toISOString().split("T")[1].split(".")[0];
    let Ride_Table = Rides;
    let date1 = currentDate + " " + currentTime;
    let date2 = date1;
    let vehicle_plate_num = availabeVehicle(Vehicles, Ride_Table, date1, date2);
    if (vehicle_plate_num !== false) {
      console.log(vehicle_plate_num, "it worked?");
    } else {
      alert(
        vehicle_plate_num +
          "   theres no vehicle availabe at this time, try at different date"
      );
    }
    // I need to enter these next things: user id

    // axios
    //   .post("http://localhost:4002/Ride_data", {
    //     Data: formData,
    //     id: id,
    //     StartingDate: new_StartingDate,
    //     EndingDate: new_EndingDate,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
    // console.log(formData);
  }
}
function availabeVehicle(
  vehicles,
  Rides,
  Starting_date_new,
  finnishing_date_new
) {
  let vehiclePlateNum = VehicleThatIsntInUse(vehicles, Rides);
  if (vehiclePlateNum !== undefined) {
    return vehiclePlateNum;
  }
  if (Rides === []) {
    return "there isn't any rides";
  }
  Rides.forEach((Ride) => {
    if (
      Ride.Starting_Date >= finnishing_date_new ||
      Ride.finnishing_date <= Starting_date_new
    ) {
      return Ride.vehicle_plate_num;
    }
  });
  return false;
}

function VehicleThatIsntInUse(vehicles, Rides) {
  for (let j = 0; j < vehicles.length; j++) {
    for (let i = 0; i < Rides.length; i++) {
      if (!(Rides[i].vehicle_plate_num === vehicles[j].vehicle_plate_num)) {
        console.log(
          "The vehicle plate number : " + vehicles[j].vehicle_plate_num
        );
        return vehicles[j].vehicle_plate_num;
      }
    }
  }
}
