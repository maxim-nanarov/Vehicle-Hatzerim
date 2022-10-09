import React, { useEffect, useState } from "react";
import Myimage from "../../pictures/Logo_Hatzerim.jpg";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import "./Main_menu.scss";
import axios from "axios";

export default function MainMenu() {
  let { id } = useParams();
  const { search } = useLocation();
  const Da = new Date();
  const [date, setDate] = useState(Da);
  const [User, setUser] = useState([]);

  console.log(id);

  useEffect(() => {
    axios
      .get("http://localhost:4002/get_specific_user", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        console.log("WORKED");
        setUser(res);
      })
      .catch((err) => {
        alert(err);
        // alert("contact me at 058-5599369");
      });
  }, [User, id]);
  console.log(User);
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
          <Link to={`/Main_Menu/${id}/Add_User${search}`}>Add User</Link>
        </nav>
        <div className="TheRestOfTheSite">
          <Outlet />
        </div>
      </div>
    </>
  );
}
