import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Vehicle_Schedule.scss";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function VehicleSchedule() {
  const [Rides, setRides] = useState([]);
  const [DateFilter, setDateFilter] = useState();
  const [DestinationFilter, setDestinationFilter] = useState("");
  const [plateNum, setPlateNum] = useState("");
  const [Data, setData] = useState([]);
  const [Filter, setFilter] = useState([]);
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
    if (plateNum !== "") {
      setFilter(FilterplateNum(Data, Filter, plateNum));
    } else if (DestinationFilter !== "") {
      setFilter(FilterDestination(Data, Filter, DestinationFilter));
    } else {
      setFilter([]);
    }
  }, [plateNum, DestinationFilter]);
  console.log(plateNum);
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
          <tr className="Card" key={count}>
            <th>{Ride.ride_id}</th>
            <th>{Ride.vehicle_plate_num}</th>
            <th>{Ride.destination_name}</th>
            <th>{Ride.reason_name}</th>
            <th>
              {Ride.company_name +
                " | " +
                Ride.size_name +
                " | " +
                Ride.type_name}
            </th>
            <th>{Ride.user_name + "  " + Ride.user_surname} </th>
            <th>{Ride.will_take_riders.toString()} </th>
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
          <tr className="Card" key={count}>
            <th>{Ride.ride_id}</th>
            <th>{Ride.vehicle_plate_num}</th>
            <th>{Ride.destination_name}</th>
            <th>{Ride.reason_name}</th>
            <th>
              {Ride.company_name +
                " | " +
                Ride.size_name +
                " | " +
                Ride.type_name}
            </th>
            <th>{Ride.user_name + "  " + Ride.user_surname} </th>
            <th>{Ride.will_take_riders.toString()} </th>
            <th>{prettyDate2(Ride.starting_date)} </th>
            <th>{prettyDate2(Ride.finishing_date)} </th>
          </tr>
        );
      } else {
        return <div></div>;
      }
    });
  }

  return (
    <div className="MainDivRides">
      <div className="Headline">
        <h1>Vehicle Schedual</h1>
      </div>
      <div>
        <div className="filter-nav">
          <div
            style={{
              display: "flex",
              flexFlow: "column nowrap",
            }}
          >
            <Calendar onChange={(item) => setDateFilter(item)} />
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
            <div className="filter-button">
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <table>
        <tr className="Card" key={count}>
          <th>Id</th>
          <th>vehicle plate number</th>
          <th>Destination </th>
          <th>Reason </th>
          <th>Vehicle type</th>
          <th>User Name </th>
          <th>Will take riders</th>
          <th>Starting</th>
          <th>Finishing</th>
        </tr>
        {a}
      </table>
    </div>
  );
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
      console.log("Vehicle Schedual: " + Filter[i]);
    }
  } else {
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].vehicle_plate_num === Number(plateNum)) {
        Result.push(Data[i]);
        console.log(
          Data[i].vehicle_plate_num === Number(plateNum),
          Data[i].vehicle_plate_num,
          Number(plateNum)
        );
      }
      console.log("Vehicle Schedual: " + Data[i]);
    }
  }
  if (Result.length > 0) {
    console.log(Result);
  }
  console.log("vehicle plate num: " + plateNum);
  return Result;
}

function FilterDestination(Data, Filter, Destination) {
  let Result = [];
  if (Filter.length > 0) {
    console.log(Destination);
    for (let i = 0; i < Filter.length; i++) {
      console.log(
        Filter[i].destination_name.includes(Destination),
        Filter[i].destination_name,
        Destination
      );
      if (Filter[i].destination_name.includes(Destination)) {
        Result.push(Filter[i]);
      }
    }
  } else {
    console.log(Destination);
    for (let i = 0; i < Data.length; i++) {
      console.log(
        Data[i].destination_name.includes(Destination),
        Data[i].destination_name,
        Destination
      );
      if (Data[i].destination_name.includes(Destination)) {
        Result.push(Data[i]);
      }
    }
  }
  console.log(Data[0].destination_name);
  return Result;
}
