import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Vehicle_Schedule.scss";

export default function VehicleSchedule() {
  const [Rides, setRides] = useState([]);

  useEffect(() => {
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
  }, []);

  console.log(Rides);

  let count = 0;
  let a = Rides.map((Ride) => {
    count++;
    console.log();

    let start = prettyDate2(Ride.starting_date);
    let finish = prettyDate2(Ride.finishing_date);

    return (
      <tr className="Card" key={count}>
        <th>{Ride.ride_id}</th>
        <th>{start}</th>
        <th>{finish}</th>
        <th>{JSON.stringify(Ride.will_take_riders)}</th>
        <th>{Ride.vehicle_plate_num}</th>
        <th>{Ride.reason_id} </th>
        <th>{Ride.user_id} </th>
      </tr>
    );
  });
  return (
    <div className="MainDivRides">
      <table>
        {" "}
        <tr className="Card" key={count}>
          <th>id</th>
          <th>starting</th>
          <th>finishing</th>
          <th>will take riders</th>
          <th>vehicle plate</th>
          <th>reason id </th>
          <th>user </th>
        </tr>
        {a}
      </table>
    </div>
  );
}

function prettyDate2(time) {
  var date = new Date(parseInt(time));
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
}
