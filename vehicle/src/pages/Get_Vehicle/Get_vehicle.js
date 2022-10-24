import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
        <option
          key={Destination.destination_id}
          value={Destination.destination_id}
        >
          {Destination.destination_name}
        </option>
      </>
    );
  });
  count = 0;
  let b = Reasons.map((Reason) => {
    count++;
    return (
      <>
        <option key={count} value={Reason.reason_id}>
          {Reason.reason_name}
        </option>
      </>
    );
  });
  let date = new Date();
  return (
    <>
      <div className="MainDivGetV">
        <form id="AddForm" onSubmit={onSubmit}>
          <div className="signUpDiv">
            <div className="dateDiv">
              <label>Start: </label>
              <div>
                <div className="Seperator">
                  <input
                    id="Starting_Date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    name="Starting_Date"
                    type="date"
                  />
                </div>
                <div className="Seperator">
                  <input
                    id="Starting_Hour"
                    defaultValue={date.getHours() + ":" + date.getMinutes()}
                    name="Starting_Hour"
                    type="time"
                  />
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
                    defaultValue={new Date().toISOString().split("T")[0]}
                    ata-date=""
                    data-date-format="DD MMMM YYYY"
                  />
                </div>
                <div className="Seperator">
                  <input
                    id="Ending_Hour"
                    defaultValue={date.getHours() + ":" + date.getMinutes()}
                    name="Ending_Hour"
                    type="time"
                  />
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
    // let currentTime = new Date().toISOString().split("T")[1].split(".")[0];
    console.log(Rides);
    let Ride_Table = Rides;
    let date1 = formData.Starting_Date + " " + formData.Starting_Hour + ":00";
    let date2 = formData.Ending_Date + " " + formData.Ending_Hour + ":00";
    let vehicle_plate_num = availabeVehicle(Vehicles, Ride_Table, date1, date2);
    console.log("the chosen vehicle: " + vehicle_plate_num);
    if (vehicle_plate_num === undefined) {
      alert(
        vehicle_plate_num +
          "   theres no vehicle availabe at this time, try at different date"
      );
    }
    console.log(id, date1, date2);
    if (vehicle_plate_num !== undefined) {
      axios
        .post("http://localhost:4002/Ride_data", {
          data: {
            Data: formData,
            id: id,
            StartingDate: new Date(date1),
            EndingDate: new Date(date2),
            plateNum: vehicle_plate_num,
          },
        })
        .then((res) => {
          console.log(res.data);
          window.location.href += `/Selected_Vehicles?Data=${formData}&StartingDate=${new Date(
            date1
          )}&EndingDate=${new Date(
            date2
          )}&vehicle_plate_num=${vehicle_plate_num}`;
        });
      console.log(formData);
    } else {
      alert("There are no vehicles availabe at this time.");
    }
  }
}

//the main function of the submit button makes
//the calculations of findings the right ride.
//It will return a vehicle based on the client score.
//age (optionally in the future)
//reason
//destination
//if there's an availabe vehicle at all
//IF vehicle exist return number
//ELSE return undefined.
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
    return undefined;
  }

  // ToDo: need to seperate this function.
  let Availabe_Vehicles = [];
  Rides.forEach((Ride) => {
    if (
      If_In_Range(
        Ride.starting_date,
        Ride.finishing_date,
        finnishing_date_new
      ) &&
      If_In_Range(Ride.starting_date, Ride.finishing_date, Starting_date_new)
    ) {
      Availabe_Vehicles.push(Ride.vehicle_plate_num);
    } else {
      Availabe_Vehicles = RemoveUsedVehicle(
        Availabe_Vehicles,
        Ride.vehiclePlateNum
      );
    }
  });
  if (Availabe_Vehicles[0] !== undefined) {
    return Availabe_Vehicles[0];
  } else {
    return undefined;
  }
}

//if the date is between the start and finish date, then
//false.
export function If_In_Range(start, finish, date) {
  return !(date >= start && date <= finish);
}
//checks if there's a vehcile that
//isnt used at all in the main ride table.
function VehicleThatIsntInUse(vehicles, Rides) {
  for (let j = 0; j < vehicles.length; j++) {
    if (!ifExist(Rides, vehicles[j].vehicle_plate_num)) {
      return vehicles[j].vehicle_plate_num;
    } else {
      console.log("this vehicle is used once" + vehicles[j].vehicle_plate_num);
    }
  }
  return undefined;
}

//helps in the main function, to
//remove the vehicle which one of their
//rides is in between the relevent
//date and time.
function RemoveUsedVehicle(Availabe_Vehicles, plateNum) {
  for (let i = 0; i < Availabe_Vehicles.length; i++) {
    if (plateNum === Availabe_Vehicles[i]) {
      Availabe_Vehicles[i].pop();
    }
  }
  return Availabe_Vehicles;
}

//checks if the plate number of the given vehicle exist in
//the main rides table.
function ifExist(array, number) {
  let flag = false;
  array.forEach((num) => {
    if (num.vehicle_plate_num === number) {
      flag = true;
    }
  });
  return flag;
}
