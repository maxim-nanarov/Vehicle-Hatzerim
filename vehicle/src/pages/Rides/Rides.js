import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Rides.scss";
//ToDo: table show rides with filters
export default function Rides() {
  // const [Vehicles, setVehicles] = useState([]);
  const [VehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://vehicle-hatzerim.herokuapp.com/Vehicles_And_Its_Relevent_Element"
      )
      .then(function (res) {
        setVehiclesData(res.data);
        console.log(res.data);
      });
  }, []);

  let a = VehiclesData.map((veh) => {
    let count = 0;
    return (
      <>
        <tr className="Card" key={count}>
          <th>{veh.vehicle_plate_num}</th>
          <th>{veh.company_name}</th>
          <th>{veh.size_name + " : " + veh.size_capacity}</th>
          <th>{veh.type_name}</th>
        </tr>
      </>
    );
  });

  console.log(VehiclesData);

  return (
    <div>
      <div className="RidesDiv">
        <table>
          <tr className="Card">
            <th>vehicle plate number</th>
            <th>Company</th>
            <th>Size Capacity</th>
            <th>Type</th>
          </tr>
          {a}
        </table>
      </div>
    </div>
  );
}
