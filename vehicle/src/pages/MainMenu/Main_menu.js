import React from "react";
import Myimage from "../../pictures/Logo_Hatzerim.jpg";
import { useParams, Link, Outlet } from "react-router-dom";

export default function MainMenu() {
  let { id } = useParams();

  return (
    <>
      <div>
        <div>
          <img src={Myimage} alt="Logo"></img>
          <label>Hello {id}</label>
        </div>
        <nav>
          <Link to="/Main_Menu/Get_vehicle">assigning new vehicle</Link>
          <Link to="/Main_Menu/Vehicle_Schedule">Vehicle Schedule</Link>
          <Link to="/Main_Menu/Rides">Rides</Link>
        </nav>

        <Outlet />
      </div>
    </>
  );
}
