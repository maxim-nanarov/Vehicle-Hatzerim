// import { useParams } from "react";
// import axios from "axios";
import "./Selected_Vehicles.scss";

import React from "react";
import { useParams } from "react-router-dom";

export default function Selected_Vehicles() {
  let { Data, id, StartingDate, EndingDate, vehicle_plate_num } = useParams();
  console.log(Data, id, StartingDate, EndingDate, vehicle_plate_num);

  return <div>Selected Vehicles</div>;
}
