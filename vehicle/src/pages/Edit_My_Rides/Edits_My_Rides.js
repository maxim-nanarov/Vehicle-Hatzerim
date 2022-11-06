import "./Edit_My_Ride.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../extraComponents/LoadingScreen";
import { useParams } from "react-router-dom";

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
  }, []);

  useEffect(() => {
    let date = new Date();
    let count = 0;
    let a = Data.map((ride) => {
      if (
        ride.user_id === Number(id) &&
        new Date(ride.starting_date).toISOString().split("T")[0] >=
          date.toISOString().split("T")[0]
      ) {
        console.log("Worked");
        count++;
        if (Edit === ride.ride_id) {
          return (
            <tr key={count}>
              <th>
                <input value={ride.destination_name}></input>
              </th>
              <th>
                <input value={ride.reason_name}></input>
              </th>
              <th>{ride.vehicle_plate_num}</th>
              <th>
                <input
                  type="time"
                  value={ride.starting_date.split("T")[1].split(":00.000Z")[0]}
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
                }}
              >
                Submit
              </th>
              <th
                onClick={() => {
                  setEdit(undefined);
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
                console.log(Delete);
              }}
            >
              Delete
            </th>
          </tr>
        );
      }
    });
    setDisplayData(a);
  }, [Edit, Delete, Data]);
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
    </div>
  );
}
