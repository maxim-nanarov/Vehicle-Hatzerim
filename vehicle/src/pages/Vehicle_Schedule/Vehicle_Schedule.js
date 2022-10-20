import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Vehicle_Schedule.scss";

export default function VehicleSchedule() {
  const [Rides, setRides] = useState([]);
  const [Data, setData] = useState([]);

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
  console.log(Data);
  let count = 0;
  let a = Data.map((Ride) => {
    count++;

    return (
      <tr className="Card" key={count}>
        <th>{Ride.ride_id}</th>
        <th>{Ride.destination_name}</th>
        <th>{Ride.reason_name}</th>
        <th>
          {Ride.company_name + " | " + Ride.size_name + " | " + Ride.type_name}
        </th>
        <th>{Ride.user_name + "  " + Ride.user_surname} </th>
        <th>{Ride.will_take_riders.toString()} </th>
        <th>{prettyDate2(Ride.starting_date)} </th>
        <th>{prettyDate2(Ride.finishing_date)} </th>
      </tr>
    );
  });
  return (
    <div className="MainDivRides">
      <table>
        {" "}
        <tr className="Card" key={count}>
          <th>Id</th>
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
// function getType(Vehicle_T, Type_VehicleT, vehicle_plate_num) {
//   let Type_searched_id = 0;

//   Vehicle_T.forEach((car) => {
//     if (car.vehicle_plate_num === vehicle_plate_num) {
//       Type_searched_id = car.type_id;
//     }
//   });
//   let x;
//   Type_VehicleT.forEach((Type) => {
//     if (Type.type_id === Type_searched_id) {
//       x = Type.type_name;
//       return Type.type_name;
//     }
//   });
//   return x;
// }
// function getreason(Vehicle_T, reason_T, vehicle_plate_num) {
//   let reason_searched_id = 0;

//   Vehicle_T.forEach((car) => {
//     if (car.vehicle_plate_num === vehicle_plate_num) {
//       reason_searched_id = car.reason_id;
//     }
//   });
//   let x;
//   reason_T.forEach((reason) => {
//     if (reason.type_id === reason_searched_id) {
//       x = reason.reason_name;
//       return reason.reason_name;
//     }
//   });
//   return x;
// }
// function getUser(Rides_T, user_T, vehicle_plate_num) {
//   let user_searched_id = 0;

//   Rides_T.forEach((Ride) => {
//     if (Ride.vehicle_plate_num === vehicle_plate_num) {
//       user_searched_id = Ride.user_id;
//     }
//   });
//   let x;
//   console.log(user_T);
//   user_T.forEach((user) => {
//     if (user.user_id === user_searched_id) {
//       x = user.user_name + " " + user.user_surname;
//       console.log(x);
//       return x;
//     }
//   });
//   return x;
// }
// function getDestionation(Rides_T, Destinations, vehicle_plate_num) {
//   let user_searched_id = 0;

//   Rides_T.forEach((Ride) => {
//     if (Ride.vehicle_plate_num === vehicle_plate_num) {
//       user_searched_id = Ride.user_id;
//     }
//   });
//   let x;
//   console.log(Destinations);
//   Destinations.forEach((destination) => {
//     if (destination.destination_id === user_searched_id) {
//       x = destination.destination_name;
//       console.log(x);
//       return x;
//     }
//   });
//   return x;
// }
