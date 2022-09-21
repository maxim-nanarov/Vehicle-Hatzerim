import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Rides.scss";
//ToDo: table show rides with filters
export default function Rides() {
  const [Vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios
      .get("https://vehicle-hatzerim.herokuapp.com/vehicles")
      .then(function (res) {
        setVehicles(res.data);
      });
  }, []);

  let a = Vehicles.map((veh) => {
    let count = 0;
    return (
      <>
        <tr className="Card" key={count}>
          <th>{veh.vehicle_plate_num}</th>
          <th>{veh.type_id}</th>
          <th>{veh.vehicle_plate_num}</th>
        </tr>
      </>
    );
  });

  console.log(Vehicles);
  return (
    <div>
      <div className="RidesDiv">
        <tr className="Card">
          <th>vehicle plate number</th>
          <th>type id</th>
          <th>veh.vehicle_plate_num</th>
        </tr>
        {a}
      </div>
    </div>
  );
}
