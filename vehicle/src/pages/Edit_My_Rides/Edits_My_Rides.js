import "./Edit_My_Ride.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../extraComponents/LoadingScreen";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function EditMyRides() {
  //this state will show which coulum in the table are
  //going to be edited by the user choice.
  //scratch that, now the edit will be only
  //on one ride every time.
  let { id } = useParams();
  const [Edit, setEdit] = useState(0);
  const [Data, setData] = useState([]);
  const [DisplayData, setDisplayData] = useState();
  const [Delete, setDelete] = useState(0);
  const [UpdateD, setUpdateD] = useState("");
  const [UpdateR, setUpdateR] = useState("");
  const [UpdateST, setUpdateST] = useState("");
  const [UpdateFT, setUpdateFT] = useState("");
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [helper, setHelper] = useState();
  const [SelectedVehicle, setSelectedVehicle] = useState();
  const [vehicles, setVehicels] = useState();
  const [availabeVehicleDisplay, setAvailabeVehicleDisplay] = useState();

  const [aV, setAv] = useState([]);
  let count = 0;
  function Test() {
    let sdate = new Date().toISOString().split("T")[0] + " " + UpdateST + ":00";
    let sDate = new Date(sdate).toLocaleString();
    let fdate = new Date().toISOString().split("T")[0] + " " + UpdateFT + ":00";
    let fDate = new Date(fdate).toLocaleString();
    console.log(new Date(UpdateST), new Date(UpdateFT), sDate, fDate);
    setUpdateST(sDate);
    setUpdateFT(fDate);
    let Ride_Table = ReleventTable(Data, sdate);
    console.log(sDate, fDate);
    if (sDate >= fDate) {
      alert("starting date cant be bigger then the finishing date.");
      return undefined;
    } else {
      let result = availabeVehicle(vehicles, Ride_Table, UpdateST, UpdateFT);
      console.log("available vehicels " + result);
      setAv(result);
      setOpen((o) => !o);
    }
  }
  function UpdateTheRow() {
    let data = {
      destination: UpdateD,
      Reason: UpdateR,
      starting_date: UpdateST,
    };
  }
  useEffect(() => {
    axios
      .get("https://vehicle-hatzerim.herokuapp.com/Get_Ride_data", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data);
      });

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
        setVehicels(res.data);
      });
  }, []);

  let c;
  useEffect(() => {
    if (aV.length > 0) {
      c = vehicles.map((vehicle) => {
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
  }, [aV, vehicles, SelectedVehicle]);

  useEffect(() => {
    let date = new Date();
    let count = 0;
    let a = Data.map((ride) => {
      if (
        ride.user_id === Number(id) &&
        new Date(ride.starting_date).toISOString().split("T")[0] >=
          date.toISOString().split("T")[0]
      ) {
        count++;
        if (Edit === ride.ride_id) {
          return (
            <tr key={count}>
              <th>
                <input
                  defaultValue={ride.destination_name}
                  onChange={(e) => {
                    setUpdateD(e.target.value);
                  }}
                ></input>
              </th>
              <th>
                <input
                  defaultValue={ride.reason_name}
                  onChange={(e) => {
                    setUpdateR(e.target.value);
                  }}
                ></input>
              </th>
              <th>{ride.vehicle_plate_num}</th>
              <th>
                <input
                  type="time"
                  defaultValue={
                    ride.starting_date.split("T")[1].split(":00.000Z")[0]
                  }
                  onChange={(e) => {
                    setUpdateST(e.target.value);
                  }}
                ></input>
              </th>
              <th>
                {/* {ride.finishing_date.split("T")[0] + */}
                {/* " " + */}
                {ride.finishing_date.split("T")[1].split(":00.000Z")[0]}
              </th>
              <th>{String(ride.will_take_riders)}</th>
              <th
                onClick={() => {
                  setEdit(ride.ride_id);
                  if (UpdateD === "") {
                    setUpdateD(ride.destination_name);
                  }
                  if (UpdateR === "") {
                    setUpdateR(ride.reason_name);
                  }
                  if (UpdateST === "") {
                    setUpdateST(
                      ride.starting_date.split("T")[1].split(":00.000Z")[0]
                    );
                  }
                  if (UpdateFT === "") {
                    setUpdateFT(
                      ride.finishing_date.split("T")[1].split(":00.000Z")[0]
                    );
                  }
                  setHelper(ride);
                  Test();
                }}
              >
                Submit
              </th>
              <th
                onClick={() => {
                  setEdit(0);
                  setUpdateD("");
                  setUpdateR("");
                  setUpdateST("");
                }}
              >
                Cancle
              </th>
            </tr>
          );
        } else if (Delete === ride.ride_id) {
          return (
            <tr key={count}>
              <th>DELETED</th>
            </tr>
          );
        }
        return (
          <tr key={count}>
            <th>{ride.destination_name}</th>
            <th>{ride.reason_name}</th>
            <th>{ride.vehicle_plate_num}</th>
            <th>
              {/* {ride.starting_date.split("T")[0] +
                " " + */}
              {ride.starting_date.split("T")[1].split(":00.000Z")[0]}
            </th>
            <th>
              {/* {ride.finishing_date.split("T")[0] + */}
              {/* " " + */}
              {ride.finishing_date.split("T")[1].split(":00.000Z")[0]}
            </th>
            <th>{String(ride.will_take_riders)}</th>
            <th
              onClick={() => {
                setEdit(ride.ride_id);
              }}
            >
              Edit
            </th>
            <th
              onClick={() => {
                setDelete(ride.ride_id);
              }}
            >
              Delete
            </th>
          </tr>
        );
      }
    });
    setDisplayData(a);
  }, [Edit, Delete, Data, UpdateD, UpdateST, UpdateR, helper]);

  //the if that will return loading screen
  //if the main table isnt loaded yet from the server
  if (Data.length === 0) {
    return (
      <div className="Center">
        <LoadingScreen></LoadingScreen>
      </div>
    );
  }
  return (
    <div>
      <table>
        <tr>
          <th>Destination</th>
          <th>Reason Name</th>
          <th>Plate Number</th>
          <th>Starting Date</th>
          <th>Finishing Date</th>
          <th>Will Take Riders</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {DisplayData}
      </table>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        {availabeVehicleDisplay}
        <div>
          <h3>Are You Sure?</h3>
          <div>
            <button onClick={Test}>Confirm</button>
            <button>Cancel</button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
// function SortRideTable(Rides) {
//   return Rides.sort(function (a, b) {
//     return a.vehicle_plate_num - b.vehicle_plate_num;
//   });
// }

export function If_In_Range(start, finish, date) {
  start = new Date(start);
  finish = new Date(finish);
  date = new Date(date);
  return date >= start && date <= finish;
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
      console.log(Rides[i].vehicle_plate_num + " this vehicle is available");
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
