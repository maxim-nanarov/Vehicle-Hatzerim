import React from "react";
import Myimage from "../../pictures/Logo_Hatzerim.jpg";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import "./Main_menu.scss";
export default function MainMenu() {
  let { id } = useParams();
  const { search } = useLocation();
  return (
    <>
      <div className="MainMenuDiv">
        <div className="header">
          <img src={Myimage} alt="Logo"></img>
          <label>Hello </label>
        </div>
        <nav>
          <Link to={`/Main_Menu/${id}/Get_vehicle${search}`}>Get Vehicle</Link>
          <Link to={`/Main_Menu/${id}/Vehicle_Schedule${search}`}>
            Vehicle Schedule
          </Link>
          <Link to={`/Main_Menu/${id}/Rides${search}`}>Rides</Link>
        </nav>

        <Outlet />
      </div>
    </>
  );
}
