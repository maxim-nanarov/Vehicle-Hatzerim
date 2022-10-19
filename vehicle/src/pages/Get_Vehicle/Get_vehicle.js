import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Get_vehicle.scss";
import axios from "axios";
import If_In_Range from "./Get_Vehicle_InRange";
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
    let currentDate = new Date().toISOString();
    // let currentTime = new Date().toISOString().split("T")[1].split(".")[0];
    let Ride_Table = Rides;
    let date1 = currentDate;
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

//the main function of the submit button makes
//the calculations of findings the right ride.
//It will return a vehicle based on the client score.
//age (optionally in the future)
//reason
//destination
//if there's an availabe vehicle at all
function availabeVehicle(
  // vehicles,
  Rides,
  Starting_date_new,
  finnishing_date_new
) {
  // console.log("availabe vehicle function");
  // let vehiclePlateNum = VehicleThatIsntInUse(vehicles, Rides);
  // if (vehiclePlateNum !== undefined) {
  //   return vehiclePlateNum;
  // }
  // if (Rides === []) {
  //   return "there isn't any rides";
  // }

  // ToDo: need to seperate this function.
  let Availabe_Vehicles = [];
  let flag = false;
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
      for (let i = 0; i < possible_Vehicles.length; i++) {
        if (ride.vehicle_plate_num === possible_Vehicles[i]) {
          possible_Vehicles[i].pop();
        }
      }
    }
  });
  if (possible_Vehicles[0] !== undefined) {
    return possible_Vehicles[0];
  } else {
    console.alert("There aint no vehicles availabe now");
  }
}

//checks if there's a vehcile that
//isnt used at all in the main ride table.
function VehicleThatIsntInUse(vehicles, Rides) {
  console.log("Vehcile that isnt in use function");
  for (let j = 0; j < vehicles.length; j++) {
    if (!ifExist(Rides, vehicles[j].vehicle_plate_num)) {
      return vehicles[j].vehicle_plate_num;
    } else {
      console.log("this vehicle is used");
    }
  }
  return "nothing was availabe entierly, find in ";
}

//checks if the plate number of the given vehicle exist in
//the main rides table.
function ifExist(array, number) {
  let flag = false;
  console.log("if exist funciton");
  array.forEach((num) => {
    console.log(num.vehicle_plate_num);
    if (num.vehicle_plate_num === number) {
      flag = true;
    }
  });
  console.log("what?");
  return flag;
}

function DateInRange(start, finish, date) {
  return !(date > start && date < finish);
}
