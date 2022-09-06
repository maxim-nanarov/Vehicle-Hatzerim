import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Vehicle_Schedule.scss";

export default function VehicleSchedule() {
  const [Rides, setRides] = useState([]);
  const [Users, setUsers] = useState([]);
  const [reason, setReason] = useState([]);
  const [Type, setType] = useState([]);
  const [Vehicle, setVehicle] = useState([]);
  const [Destinations, setDestinations] = useState([]);

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

    axios
      .get("https://vehicle-hatzerim.herokuapp.com/Type_Vehicle", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setType(res.data);
      });

    axios
      .get("https://vehicle-hatzerim.herokuapp.com/users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUsers(res.data);
      });

    axios
      .get("https://vehicle-hatzerim.herokuapp.com/reasons", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setReason(res.data);
      });

    axios
      .get("https://vehicle-hatzerim.herokuapp.com/vehicles", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setVehicle(res.data);
      });

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
  }, []);

  let count = 0;
  let a = Rides.map((Ride) => {
    count++;

    let start = prettyDate2(Ride.starting_date);
    let finish = prettyDate2(Ride.finishing_date);
    let type_name = getType(Vehicle, Type, Ride.vehicle_plate_num);
    let reason_name = getreason(Vehicle, reason, Ride.vehicle_plate_num);
    let user_name = getUser(Rides, Users, Ride.vehicle_plate_num);
    let dstination = getDestionation(
      Rides,
      Destinations,
      Ride.vehicle_plate_num
    );
    return (
      <tr className="Card" key={count}>
        <th>{Ride.ride_id}</th>
        <th>{user_name} </th>
        <th>{start}</th>
        <th>{finish}</th>
        <th>{JSON.stringify(Ride.will_take_riders)}</th>
        <th>{type_name}</th>
        <th>{reason_name} </th>
        <th>{dstination} </th>
      </tr>
    );
  });
  return (
    <div className="MainDivRides">
      <table>
        {" "}
        <tr className="Card" key={count}>
          <th>Id</th>
          <th>User </th>
          <th>Starting</th>
          <th>Finishing</th>
          <th>Will take riders</th>
          <th>Vehicle type</th>
          <th>Reason </th>
          <th>Destination </th>
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
function getType(Vehicle_T, Type_VehicleT, vehicle_plate_num) {
  let Type_searched_id = 0;

  Vehicle_T.forEach((car) => {
    if (car.vehicle_plate_num === vehicle_plate_num) {
      Type_searched_id = car.type_id;
    }
  });
  let x;
  Type_VehicleT.forEach((Type) => {
    if (Type.type_id === Type_searched_id) {
      x = Type.type_name;
      return Type.type_name;
    }
  });
  return x;
}
function getreason(Vehicle_T, reason_T, vehicle_plate_num) {
  let reason_searched_id = 0;

  Vehicle_T.forEach((car) => {
    if (car.vehicle_plate_num === vehicle_plate_num) {
      reason_searched_id = car.reason_id;
    }
  });
  let x;
  reason_T.forEach((reason) => {
    if (reason.type_id === reason_searched_id) {
      x = reason.reason_name;
      return reason.reason_name;
    }
  });
  return x;
}
function getUser(Rides_T, user_T, vehicle_plate_num) {
  let user_searched_id = 0;

  Rides_T.forEach((Ride) => {
    if (Ride.vehicle_plate_num === vehicle_plate_num) {
      user_searched_id = Ride.user_id;
    }
  });
  let x;
  console.log(user_T);
  user_T.forEach((user) => {
    if (user.user_id === user_searched_id) {
      x = user.user_name + " " + user.user_surname;
      console.log(x);
      return x;
    }
  });
  return x;
}
function getDestionation(Rides_T, Destinations, vehicle_plate_num) {
  let user_searched_id = 0;

  Rides_T.forEach((Ride) => {
    if (Ride.vehicle_plate_num === vehicle_plate_num) {
      user_searched_id = Ride.user_id;
    }
  });
  let x;
  console.log(Destinations);
  Destinations.forEach((destination) => {
    if (destination.destination_id === user_searched_id) {
      x = destination.destination_name;
      console.log(x);
      return x;
    }
  });
  return x;
}
