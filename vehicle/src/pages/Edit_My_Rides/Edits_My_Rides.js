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
  const [willTakeRiders, setUpdateWTR] = useState();
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
  const [UpdateFlag, setUpdateFlag] = useState(false);
  const [aV, setAv] = useState([]);
  const [DestinationsTable, setDT] = useState([]);
  const [ReasonTable, setRT] = useState([]);
  const [TookKey, setTookKey] = useState(false);
  const [TookVehicleKey, setTookVehicleKey] = useState();
  let count = 0;

  function Test() {
    if (SelectedVehicle === undefined) {
      alert("Please choose a vehicle");
    } else {
      console.log(SelectedVehicle);
    }

    let Destination_id = 0;
    for (let i = 0; i < DestinationsTable.length; i++) {
      if (DestinationsTable[i].destination_name === UpdateD) {
        Destination_id = DestinationsTable[i].destination_id;
      }
    }
    let reason_id = 0;
    ReasonTable.forEach((reason) => {
      if (reason.reason_name === UpdateR) {
        reason_id = reason.reason_id;
      }
    });

    axios
      .post("https://vehicle-hatzerim.herokuapp.com/Update_Ride", {
        data: {
          destination_id: Destination_id,
          will_take_riders: willTakeRiders,
          reason_id: reason_id,
          vehicle_plate_num: SelectedVehicle,
          startin_date: fixHoursForward(UpdateST),
          finishing_date: fixHoursForward(UpdateFT),
          ride_id: Edit,
        },
      })
      .then((res) => {
        console.log("worked");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("didnt work");
        console.log(err);
      });
    setOpen((o) => !o);

    console.log(reason_id, Destination_id, Edit, willTakeRiders);
  }

  function DeleteRide() {
    axios
      .post("https://vehicle-hatzerim.herokuapp.com/Delete_Ride", {
        data: {
          ride_id: Delete,
        },
      })
      .then((res) => {
        console.log("worked");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("didnt work");
        console.log(err);
      });
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

    axios
      .get("https://vehicle-hatzerim.herokuapp.com/Destinations", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDT(res.data);
      });

    axios
      .get("https://vehicle-hatzerim.herokuapp.com/reasons", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRT(res.data);
      });
  }, []);

  let c;
  useEffect(() => {
    if (aV.length > 0) {
      c = vehicles.map((vehicle) => {
        if (aV.find((num) => num === vehicle.vehicle_plate_num) !== undefined) {
          count++;

          if (SelectedVehicle === vehicle.vehicle_plate_num) {
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
        console.log("The most relevent log: " + ride.took_key);
        count++;
        if (Edit === ride.ride_id) {
          return (
            <tr className="Edit-Line" key={count}>
              <th>
                <div>
                  <input
                    defaultValue={ride.destination_name}
                    onChange={(e) => {
                      setUpdateD(e.target.value);
                    }}
                  ></input>
                </div>
              </th>
              <th>
                <div>
                  <input
                    defaultValue={ride.reason_name}
                    onChange={(e) => {
                      setUpdateR(e.target.value);
                    }}
                  ></input>
                </div>
              </th>
              <th>
                <div>{ride.vehicle_plate_num}</div>
              </th>
              <th>
                <div>
                  <input
                    type="time"
                    defaultValue={
                      ride.starting_date.split("T")[1].split(":00.000Z")[0]
                    }
                    onChange={(e) => {
                      setUpdateST(
                        new Date(
                          ride.starting_date.split("T")[0] +
                            " " +
                            e.target.value
                        )
                      );
                    }}
                  ></input>
                </div>
              </th>
              <th>
                <div>
                  <input
                    type="time"
                    defaultValue={
                      ride.finishing_date.split("T")[1].split(":00.000Z")[0]
                    }
                    onChange={(e) => {
                      setUpdateFT(
                        new Date(
                          ride.finishing_date.split("T")[0] +
                            " " +
                            e.target.value
                        )
                      );
                    }}
                  ></input>
                </div>
              </th>
              <th>
                <div>
                  {String(ride.will_take_riders)}
                  <input
                    type="checkBox"
                    defaultValue={ride.will_take_riders}
                    onChange={(e) => {
                      setUpdateWTR(e.target.value);
                    }}
                  ></input>
                </div>
              </th>
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
                    let newDate = fixHours(ride.starting_date);
                    setUpdateST(newDate);
                  }
                  if (UpdateFT === "") {
                    let newDate = fixHours(ride.finishing_date);
                    setUpdateFT(newDate);
                  }
                  if (willTakeRiders === undefined) {
                    setUpdateWTR(false);
                  }
                  setHelper(ride);
                  setUpdateFlag(true);
                }}
              >
                <div> Submit</div>
              </th>
              <th
                onClick={() => {
                  setEdit(0);
                  setUpdateD("");
                  setUpdateR("");
                  setUpdateST("");
                }}
              >
                <div>Cancle</div>
              </th>
            </tr>
          );
        } else if (Delete === ride.ride_id) {
          DeleteRide(ride.ride_id);
          return (
            <tr key={count}>
              <th>DELETED</th>
            </tr>
          );
        } else if (TookVehicleKey === ride.ride_id || ride.took_key) {
          return (
            <tr className="Tooked-Key-row" key={count}>
              <th>{ride.destination_name}</th>
              <th>{ride.reason_name}</th>
              <th>{ride.vehicle_plate_num}</th>
              <th>{ride.starting_date.split("T")[1].split(":00.000Z")[0]}</th>
              <th>{ride.finishing_date.split("T")[1].split(":00.000Z")[0]}</th>
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
              <th
                onClick={() => {
                  setTookKey(false);
                  setDelete(ride.ride_id);
                  UpdateTookKey(ride.ride_id, false);
                  setTookVehicleKey(undefined);
                }}
              >
                return key
              </th>
            </tr>
          );
        }
        return (
          <tr key={count}>
            <th>{ride.destination_name}</th>
            <th>{ride.reason_name}</th>
            <th>{ride.vehicle_plate_num}</th>
            <th>{ride.starting_date.split("T")[1].split(":00.000Z")[0]}</th>
            <th>{ride.finishing_date.split("T")[1].split(":00.000Z")[0]}</th>
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
            <th
              onClick={() => {
                setTookKey(true);
                setTookVehicleKey(ride.ride_id);
                UpdateTookKey(ride.ride_id, true);
              }}
            >
              Take key
            </th>
          </tr>
        );
      }
    });
    setDisplayData(a);

    if (UpdateFlag) {
      console.log("Update FT: " + UpdateFT);
      console.log("Update ST: " + UpdateST);
      console.log(Data, UpdateST);
      let Ride_Table = ReleventTable(Data, UpdateST.toISOString());

      if (UpdateST >= UpdateFT) {
        alert("starting date cant be bigger then the finishing date.");
        window.location.reload();
      } else {
        console.log(UpdateST);
        console.log(UpdateFT);
        let result = availabeVehicle(
          vehicles,
          Ride_Table,
          UpdateST.toISOString(),
          UpdateFT.toISOString()
        );
        setAv(result);
        setOpen((o) => !o);
        setUpdateFlag(false);
      }
    }

    function UpdateTookKey(ride_id, TookKey) {
      console.log(ride_id, TookKey);
      if (ride_id !== undefined) {
        axios
          .post("https://vehicle-hatzerim.herokuapp.com/Update_Took_key", {
            data: {
              Took_Key: TookKey,
              ride_id: ride_id,
            },
          })
          .then((res) => {
            console.log("worked");
            console.log(res.data);
          })
          .catch((err) => {
            console.log("didnt work");
            console.log(err);
          });
      }
      console.log(ride_id, " Took Key: ", TookKey);
    }
  }, [
    Edit,
    Delete,
    Data,
    UpdateD,
    UpdateST,
    UpdateFT,
    UpdateR,
    helper,
    UpdateFlag,
    TookKey,
    TookVehicleKey,
  ]);

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
          <th>Take key</th>
        </tr>
        {DisplayData}
      </table>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="Inside-popUp">
          <div>{availabeVehicleDisplay}</div>
          <div className="Inside-popUp-Buttons">
            <h3>Are You Sure?</h3>
            <div className="Buttons-confirm-cancle">
              <button onClick={Test}>Confirm</button>
              <button
                onClick={() => {
                  window.location.reload();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export function If_In_Range(start, finish, date) {
  start = new Date(start);
  finish = new Date(finish);
  date = new Date(date);
  return date >= start && date <= finish;
}

function IfisinRangeCompiler(Rides, Starting_date_new, finnishing_date_new) {
  let ResultFlag = false;
  console.log("if is range compiler");
  let result = [];
  for (let i = 0; i < Rides.length - 1; i++) {
    console.log(
      If_In_Range(
        Rides[i].starting_date,
        Rides[i].finishing_date,
        Starting_date_new
      )
    );
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
  console.log("Before vehicle that isnt in use funtion");
  let vehiclePlateNum = VehicleThatIsntInUse(vehicles, Rides);
  if (vehiclePlateNum !== undefined) {
    return vehiclePlateNum;
  }
  if (Rides === []) {
    return undefined;
  }
  console.log("Before if is in range funtion");

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
    console.log(Rides);
    for (let j = 0; j < vehicles.length; j++) {
      if (!ifExist(Rides, vehicles[j].vehicle_plate_num)) {
        result.push(vehicles[j].vehicle_plate_num);
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
//fixed the date converter because it was two hours late to the
//desierd time
function fixHours(Date2) {
  console.log(Date2, typeof Date2);
  let date = new Date(Date2);
  let newDate =
    Date2.split("T")[0] +
    " " +
    String(date.getHours() - 2) +
    ":" +
    String(date.getMinutes());
  console.log("the new date: " + new Date(newDate));
  return new Date(newDate);
}

function fixHoursForward(Date2) {
  console.log(Date2, typeof Date2);
  let date = new Date(Date2);
  let newDate =
    Date2.toISOString().split("T")[0] +
    " " +
    String(date.getHours() + 2) +
    ":" +
    String(date.getMinutes());
  console.log("the new date: " + new Date(newDate));
  return new Date(newDate);
}
