import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Vehicle_Schedule.scss";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import LoadingScreen from "../extraComponents/LoadingScreen";

export default function VehicleSchedule() {
  const [Rides, setRides] = useState([]);
  const [DateFilter, setDateFilter] = useState();
  const [DestinationFilter, setDestinationFilter] = useState("");
  const [plateNum, setPlateNum] = useState("");
  const [Data, setData] = useState([]);
  const [Filter, setFilter] = useState([]);
  const [clickCounterPlate, setClickCounterPlate] = useState(0);
  const [clickCounterStartingDate, setclickCounterStartingDate] = useState(0);
  const [CounetrDateF, setCounetrDateF] = useState(0);
  const [open, setOpen] = useState(false);
  const [ChosenRide, setChosenRide] = useState(undefined);
  const [DisplayChosenRide, setDisplayChosenRide] = useState(undefined);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    setDateFilter(new Date());
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
      .get("https://vehicle-hatzerim.herokuapp.com/Get_Ride_data", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  useEffect(() => {
    //Filter
    if (plateNum !== "" && DestinationFilter !== "") {
      setFilter(FilterplateNum(Data, Filter, plateNum));
      setFilter(FilterDestination(Data, Filter, DestinationFilter));
    } else if (plateNum !== "") {
      setFilter(FilterplateNum(Data, Filter, plateNum));
    } else if (DestinationFilter !== "") {
      setFilter(FilterDestination(Data, Filter, DestinationFilter));
    } else {
      setFilter([]);
    }
  }, [plateNum, DestinationFilter]);
  let c;
  useEffect(() => {
    let newCount = 0;
    if (ChosenRide !== undefined) {
      let sDate = new Date(ChosenRide.starting_date)
        .toLocaleString()
        .split(",")[0];
      let fDate = new Date(ChosenRide.finishing_date)
        .toLocaleString()
        .split(",")[0];
      c = (
        <>
          <div className="Chosen-Display" key={newCount}>
            <table>
              <tr className="Card">
                <th>Vehicle plate number</th>
                <th>Vehicle Type</th>
                <th>Destination</th>
                <th>will give rides </th>
                <th>starting</th>
                <th>finishing </th>
              </tr>
              <tr className="Card">
                <th>{ChosenRide.vehicle_plate_num}</th>
                <th>{ChosenRide.destination_name}</th>
                {/* <th>{Ride.reason_name}</th> */}
                <th>
                  {ChosenRide.company_name +
                    " | " +
                    ChosenRide.size_name +
                    " | " +
                    ChosenRide.type_name}
                </th>
                <th>{ChosenRide.will_take_riders.toString()} </th>
                <th>{prettyDate2(ChosenRide.starting_date)} </th>
                <th>{prettyDate2(ChosenRide.finishing_date)} </th>
              </tr>
            </table>
            <table>
              <tr>
                <th>User Name</th>
                <th>User Personal Phone</th>
                <th>User Work Phone</th>
                <th>User Home Phone</th>
              </tr>
              <tr>
                <th>
                  {ChosenRide.user_name + "  " + ChosenRide.user_surname}{" "}
                </th>
                <th>{ChosenRide.user_personal_phone}</th>
                <th>{ChosenRide.user_work_phone}</th>
                <th>{ChosenRide.user_home_phone}</th>
              </tr>
            </table>
          </div>
        </>
      );
      setDisplayChosenRide(c);
    }
  }, [ChosenRide]);
  let count = 0;
  let date;
  if (DateFilter !== undefined) {
    date = DateFilter.toLocaleString().split(",")[0];
  } else {
    date = new Date().toLocaleString().split(",")[0];
  }
  let a;
  if (Filter.length > 0) {
    a = Filter.map((Ride) => {
      count++;
      let sDate = new Date(Ride.starting_date).toLocaleString().split(",")[0];
      let fDate = new Date(Ride.finishing_date).toLocaleString().split(",")[0];
      if (sDate === date || fDate === date) {
        return (
          <tr
            onClick={() => {
              setChosenRide(Ride);
              setOpen((o) => !o);
            }}
            className="Card"
            key={count}
          >
            <th>{Ride.vehicle_plate_num}</th>
            <th>{Ride.destination_name}</th>
            {/* <th>{Ride.reason_name}</th> */}
            <th>
              {Ride.company_name +
                " | " +
                Ride.size_name +
                " | " +
                Ride.type_name}
            </th>
            {/* <th>{Ride.user_name + "  " + Ride.user_surname} </th> */}
            {/* <th>{Ride.will_take_riders.toString()} </th> */}
            <th>{prettyDate2(Ride.starting_date)} </th>
            <th>{prettyDate2(Ride.finishing_date)} </th>
          </tr>
        );
      } else {
        return <div></div>;
      }
    });
  } else {
    a = Data.map((Ride) => {
      count++;
      let sDate = new Date(Ride.starting_date).toLocaleString().split(",")[0];
      let fDate = new Date(Ride.finishing_date).toLocaleString().split(",")[0];
      if (sDate === date || fDate === date) {
        return (
          <tr
            onClick={() => {
              setChosenRide(Ride);
              setOpen((o) => !o);
            }}
            className="Card"
            key={count}
          >
            <th>{Ride.vehicle_plate_num}</th>
            <th>{Ride.destination_name}</th>
            {/* <th>{Ride.reason_name}</th> */}
            <th>
              {Ride.company_name +
                " | " +
                Ride.size_name +
                " | " +
                Ride.type_name}
            </th>
            {/* <th>{Ride.user_name + "  " + Ride.user_surname} </th> */}
            {/* <th>{Ride.will_take_riders.toString()} </th> */}
            <th>{prettyDate2(Ride.starting_date)} </th>
            <th>{prettyDate2(Ride.finishing_date)} </th>
          </tr>
        );
      } else {
        return <div></div>;
      }
    });
  }
  if (!(Data.length > 0)) {
    return (
      <div className="LoadingDiv">
        <LoadingScreen></LoadingScreen>
      </div>
    );
  }
  return (
    <div className="MainDivRides">
      <div className="Headline">
        <h1>Vehicle Schedual</h1>
      </div>
      <div>
        <div className="filter-nav">
          <div className="CalendarWrapper">
            <Calendar
              className="Calendar"
              onChange={(item) => setDateFilter(item)}
            />
          </div>
          <div className="filter-notdate">
            <div className="SpecificInput">
              <input
                type="number"
                id="PlateNumber"
                name="PlateNumber"
                placeholder="Vehicle number filter"
                value={plateNum}
                onChange={(num) => setPlateNum(num.target.value)}
              ></input>
              <button
                onClick={() => {
                  setPlateNum("");
                }}
              >
                X
              </button>
            </div>
            <div className="SpecificInput">
              <input
                type="text"
                id="Destination"
                name="Destination"
                placeholder="Destination filter"
                onChange={(des) => setDestinationFilter(des.target.value)}
                value={DestinationFilter}
              ></input>
              <button onClick={() => setDestinationFilter("")}>X</button>
            </div>
            <div className="SpecificInput">
              <input id="user" name="user" placeholder="user filter"></input>
              <button onClick={() => setPlateNum(undefined)}>X</button>
            </div>
            <div className="SpecificInput">
              <input
                id="Reason"
                name="Reason"
                placeholder="Reason filter"
              ></input>
              <button onClick={() => setPlateNum(undefined)}>X</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table>
          <tr className="Card" key={count}>
            <th
              onClick={() => {
                if (clickCounterPlate % 2 === 0) {
                  setFilter(sortPlateNum(Data));
                } else {
                  setFilter(sortPlateNumDown(Data));
                }
                let index = clickCounterPlate + 1;
                setClickCounterPlate(index);
              }}
            >
              vehicle plate number
            </th>
            <th>Destination </th>
            {/* <th>Reason </th> */}
            <th>Vehicle type</th>
            {/* <th>User Name </th> */}
            {/* <th>Will take riders</th> */}
            <th
              onClick={() => {
                if (clickCounterStartingDate % 2 === 0) {
                  setFilter(sortDates(Data));
                } else {
                  setFilter(sortDatesDown(Data));
                }
                let index = clickCounterStartingDate + 1;
                setclickCounterStartingDate(index);
              }}
            >
              Starting
            </th>
            <th
              onClick={() => {
                if (CounetrDateF % 2 === 0) {
                  setFilter(sortDatesF(Data));
                } else {
                  setFilter(sortDatesFDown(Data));
                }
                let index = CounetrDateF + 1;
                setCounetrDateF(index);
              }}
            >
              Finishing
            </th>
          </tr>
          {a}
        </table>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          {DisplayChosenRide}
        </Popup>
      </div>
    </div>
  );
}
//return (x === y)? 0 : x? -1 : 1;
function sortPlateNum(data) {
  return data.sort(function (a, b) {
    return a.vehicle_plate_num - b.vehicle_plate_num;
  });
}
function sortPlateNumDown(data) {
  return data.sort(function (a, b) {
    return b.vehicle_plate_num - a.vehicle_plate_num;
  });
}
function sortDates(data) {
  console.log(data);
  return data.sort(function (a, b) {
    return new Date(a.starting_date) - new Date(b.starting_date);
  });
}
function sortDatesDown(data) {
  console.log();
  return data.sort(function (a, b) {
    return new Date(b.starting_date) - new Date(a.starting_date);
  });
}

function sortDatesF(data) {
  return data.sort(function (a, b) {
    return new Date(a.finishing_date) - new Date(b.finishing_date);
  });
}
function sortDatesFDown(data) {
  return data.sort(function (a, b) {
    return new Date(b.finishing_date) - new Date(a.finishing_date);
  });
}

function prettyDate2(time) {
  let date = time.split("T");
  let hours = date[1].split(".");
  let dateString = date[0] + " " + hours[0];
  return hours[0];
}

//To Do: Filters functions that seperated from the main code.
function FilterplateNum(Data, Filter, plateNum) {
  let Result = [];
  if (Filter.length > 0) {
    for (let i = 0; i < Filter.length; i++) {
      if (Filter[i].vehicle_plate_num === plateNum) {
        Result.push(Filter[i]);
      }
    }
  } else {
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].vehicle_plate_num === Number(plateNum)) {
        Result.push(Data[i]);
      }
    }
  }

  return Result;
}

function FilterDestination(Data, Filter, Destination) {
  let Result = [];
  if (Filter.length > 0) {
    for (let i = 0; i < Filter.length; i++) {
      if (Filter[i].destination_name.includes(Destination)) {
        Result.push(Filter[i]);
      }
    }
  } else {
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].destination_name.includes(Destination)) {
        Result.push(Data[i]);
      }
    }
  }
  return Result;
}
