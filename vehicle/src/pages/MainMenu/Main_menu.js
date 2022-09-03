import React from "react";
import Myimage from "../../pictures/Logo_Hatzerim.jpg";
import { useParams, Route, Routes, Link } from "react-router-dom";
import GetVehicle from "../Get_vehicle";
import VehicleSchedule from "../Vehicle_Schedule";
import Rides from "../Rides";
export default function MainMenu() {
  let { id } = useParams();

  return (
    <>
      <div>
        <div>
          <img src={Myimage} alt="Logo"></img>
          <label>Hello {id}</label>
        </div>
        <div>
          <Link to="/Get_vehicle">assigning new vehicle</Link>
          <Link to="/Vehicle_Schedule">Vehicle Schedule</Link>
          <Link to="/Rides">Rides</Link>
        </div>
      </div>
      <Routes>
        <Route path="/Get_vehicle" element={<GetVehicle />} />
        <Route path="/Vehicle_Schedule" element={<VehicleSchedule />} />
        <Route path="/Rides" element={<Rides />} />
      </Routes>
    </>
  );
}
