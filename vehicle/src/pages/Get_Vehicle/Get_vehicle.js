import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Get_vehicle.scss";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
//To Do: Add an Edit and Delete table.
export default function GetVehicle() {
  let { id } = useParams();
  const [Destinations, setDestinations] = useState([]);
  const [Reasons, setReasons] = useState([]);
  const [Rides, setRides] = useState([]);
  const [Vehicles, setVehicles] = useState([]);
  const [open, setOpen] = useState(false);
  const [availabeVehicles, setAvailabelVehicles] = useState([]);
  const [aV, setAv] = useState([]);
  const [availabeVehicleDisplay, setAvailabeVehicleDisplay] = useState();
  const [SelectedVehicle, setSelectedVehicle] = useState();
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
  }, [Rides]);

  useEffect(() => {
    axios
      .get(
        "https://vehicle-hatzerim.herokuapp.com/Vehicles_And_Its_Relevent_Element",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setAvailabelVehicles(res.data);
      });
  }, [availabeVehicles]);
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
  let c;
  useEffect(() => {
    if (aV.length > 0) {
      c = availabeVehicles.map((vehicle) => {
        if (aV.find((num) => num === vehicle.vehicle_plate_num) !== undefined) {
          count++;

          if (SelectedVehicle === vehicle.vehicle_plate_num) {
            console.log(SelectedVehicle);
            return (
              <>
                <tr
                  className="Green-Row"
                  key={count}
                  onClick={() => setSelectedVehicle(vehicle.vehicle_plate_num)}
                >
                  <th className="Green-Row">{vehicle.vehicle_plate_num}</th>
                  <th className="Green-Row">{vehicle.company_name}</th>
                  <th className="Green-Row">
                    {vehicle.size_name} - {vehicle.size_capacity}
                  </th>
                  <th className="Green-Row">{vehicle.type_name}</th>
                </tr>
              </>
            );
          }
          return (
            <>
              <tr
                key={count}
                onClick={() => setSelectedVehicle(vehicle.vehicle_plate_num)}
              >
                <th>{vehicle.vehicle_plate_num}</th>
                <th>{vehicle.company_name}</th>
                <th>
                  {vehicle.size_name} - {vehicle.size_capacity}
                </th>
                <th>{vehicle.type_name}</th>
              </tr>
            </>
          );
        }
      });
    } else {
      c = <div></div>;
    }
    setAvailabeVehicleDisplay(c);
  }, [aV, availabeVehicles]);

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
                onClick={() => setOpen((o) => !o)}
              >
                Continue
              </button>
              <Popup open={open}>
                {
                  <div className="PopUpBackground">
                    <div className="InfoPopUp">
                      <table>
                        <tr>
                          <th>Vehicle Number</th>
                          <th>Company Name</th>
                          <th>Size</th>
                          <th>Type</th>
                        </tr>
                        {availabeVehicleDisplay}
                      </table>
                    </div>
                    <div className="ButtonDiv">
                      <button
                        className="submitButton"
                        form="AddForm"
                        type="submit"
                        value="Submit"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => setOpen((o) => !o)}
                        className="submitButton"
                      >
                        Cancle
                      </button>
                    </div>
                  </div>
                }
              </Popup>
            </div>
          </div>
        </form>
      </div>
    </>
  );
  //To Do: try to get the vehicle which are availabe to the pop up message.
  function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);
    if (formData.Take_Riders === undefined) {
      formData.Take_Riders = false;
    } else {
      formData.Take_Riders = true;
    }

    // let currentTime = new Date().toISOString().split("T")[1].split(".")[0];
    let date1 = formData.Starting_Date + " " + formData.Starting_Hour + ":00";
    let date2 = formData.Ending_Date + " " + formData.Ending_Hour + ":00";

    let Ride_Table = ReleventTable(Rides, date1);
    if (date1 >= date2) {
      alert("starting date cant be bigger then the finishing date.");
      return undefined;
    }
    if (SelectedVehicle === undefined) {
      let vehicle_plate_num = availabeVehicle(
        Vehicles,
        Ride_Table,
        date1,
        date2
      );
      if (vehicle_plate_num === undefined) {
        alert("theres no vehicle availabe at this time, try at different date");
      }
      console.log("Availabe vehicles: " + vehicle_plate_num);
      if (vehicle_plate_num !== undefined) {
        setAv(vehicle_plate_num);
      } else {
        alert("There are no vehicles availabe at this time.");
      }
    } else {
      console.log("the chosen vehicle is: " + SelectedVehicle);
      axios
        .post("https://vehicle-hatzerim.herokuapp.com/Ride_data", {
          data: {
            Data: formData,
            id: id,
            StartingDate: new Date(date1),
            EndingDate: new Date(date2),
            plateNum: SelectedVehicle,
          },
        })
        .then((res) => {
          console.log(res.data);
        });
      setOpen((o) => !o);

      setSelectedVehicle(undefined);
      window.location.reload();
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
  let Availabe_Vehicles = IfisinRangeCompiler(
    Rides,
    Starting_date_new,
    finnishing_date_new
  );
  if (Availabe_Vehicles === undefined) {
    return undefined;
  } else if (Availabe_Vehicles !== undefined) {
    return Availabe_Vehicles;
  }

  function VehicleThatIsntInUse(vehicles, Rides) {
    let result = [];
    for (let j = 0; j < vehicles.length; j++) {
      if (!ifExist(Rides, vehicles[j].vehicle_plate_num)) {
        result.push(vehicles[j].vehicle_plate_num);
      } else {
        console.log(
          "this vehicle is used once: " + vehicles[j].vehicle_plate_num
        );
      }
    }
    if (result.length > 0) {
      return result;
    }
    return undefined;
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
}

function IfisinRangeCompiler(Rides, Starting_date_new, finnishing_date_new) {
  let ResultFlag = false;
  let result = [];
  for (let i = 0; i < Rides.length - 1; i++) {
    //if this if is true, then there's no doubt about it
    //the vehicle is used in the time given.
    //true === the time is between used times.
    if (
      If_In_Range(
        Rides[i].starting_date,
        Rides[i].finishing_date,
        Starting_date_new
      ) ||
      If_In_Range(
        Rides[i].starting_date,
        Rides[i].finishing_date,
        finnishing_date_new
      )
    ) {
      ResultFlag = true;
    }
    if (Rides[i].vehicle_plate_num !== Rides[i + 1].vehicle_plate_num) {
      console.log(
        "ifisinRangeCompiler function one if before the return. this is the Result flag that will decide to retun the chosed vehicle or not: " +
          ResultFlag
      );
      console.log(
        "Oh if i forgot here the vehicle serial number: " +
          Rides[i].vehicle_plate_num
      );
      if (!ResultFlag) {
        result.push(Rides[i].vehicle_plate_num);
      } else {
        ResultFlag = false;
      }
    }
  }
  if (result.length > 0) {
    return result;
  }
  return undefined;
}

//if the date is between the start and finish date, then
//true.
export function If_In_Range(start, finish, date) {
  start = new Date(start);
  finish = new Date(finish);
  date = new Date(date);
  return date >= start && date <= finish;
}

//a table that's going to be relevent for today
function ReleventTable(Ride_Table, SDate) {
  let result = [];
  Ride_Table.forEach((Ride) => {
    if (Ride.starting_date >= SDate) {
      result.push(Ride);
    }
  });
  let Result = SortRideTable(result);
  return Result;
}

function SortRideTable(Rides) {
  return Rides.sort(function (a, b) {
    return a.vehicle_plate_num - b.vehicle_plate_num;
  });
}
