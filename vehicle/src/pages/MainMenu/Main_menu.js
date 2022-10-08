import React, { useEffect, useState } from "react";
import Myimage from "../../pictures/Logo_Hatzerim.jpg";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import "./Main_menu.scss";
export default function MainMenu() {
  let { id } = useParams();
  const { search } = useLocation();
  const Da = new Date();
  const [date, setDate] = useState(Da);

  useEffect(() => {
    const Da = new Date();
    setDate(Da.toLocaleString());
  }, [date]);

  setInterval(function () {
    let da = new Date();
    setDate(da.toLocaleString());
  }, 1000);

  return (
    <>
      <div className="MainMenuDiv">
        <div className="header">
          <img className="MainMenuIMG" src={Myimage} alt="Logo"></img>
          <div>{date.toLocaleString()}</div>
        </div>
        <nav className="topnav">
          <Link to={`/Main_Menu/${id}/Get_vehicle${search}`}>Get Vehicle</Link>
          <Link to={`/Main_Menu/${id}/Vehicle_Schedule${search}`}>
            Vehicle Schedule
          </Link>
          <Link to={`/Main_Menu/${id}/Rides${search}`}>Rides</Link>
          <Link to={`/Main_Menu/${id}/Add_Vehicle${search}`}>Add Vehicle</Link>
          <Link to={`/Main_Menu/${id}/Add_Dest${search}`}>Add Destionaion</Link>
        </nav>
        <div className="TheRestOfTheSite">
          <Outlet />
        </div>
      </div>
    </>
  );
}
