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

  useEffect(() => {
    // let DATAid = JSON.stringify(id);
    let user = async function () {
      await axios
        .get(
          `https://vehicle-hatzerim.herokuapp.com/get_specific_user/?id=${id}`
        )
        .then((res) => {
          setUser(res.data[0]);
        })
        .catch((err) => {
          alert("contact me at 058-5599369");
        });
    };
    user();
  }, [User, id]);
  useEffect(() => {
    const Da = new Date();
    setDate(Da.toLocaleString());
  });

  setInterval(function () {
    let da = new Date();
    setDate(da.toLocaleString());
  }, 1000);
  if (User.is_admin) {
    return (
      <>
        <div className="MainMenuDiv">
          <div className="header">
            <img className="MainMenuIMG" src={Myimage} alt="Logo"></img>
            <div>{date.toLocaleString()}</div>
          </div>
          <nav className="topnav">
            <Link to={`/Main_Menu/${id}/Get_vehicle${search}`}>
              Get Vehicle
            </Link>
            <Link to={`/Main_Menu/${id}${search}`}>Vehicle Schedule</Link>
            <Link to={`/Main_Menu/${id}/Rides${search}`}>Rides</Link>
            <Link to={`/Main_Menu/${id}/Add_Vehicle${search}`}>
              Add Vehicle
            </Link>
            <Link to={`/Main_Menu/${id}/Add_Dest${search}`}>
              Add Destionaion
            </Link>
            <Link to={`/Main_Menu/${id}/Add_User${search}`}>Add User</Link>
          </nav>
          <div className="TheRestOfTheSite">
            <Outlet />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="MainMenuDiv">
          <div className="header">
            <img className="MainMenuIMG" src={Myimage} alt="Logo"></img>
            <div>{date.toLocaleString()}</div>
          </div>
          <nav className="topnav">
            <Link to={`/Main_Menu/${id}/Get_vehicle${search}`}>
              Get Vehicle
            </Link>
            <Link to={`/Main_Menu/${id}`}>Vehicle Schedule</Link>
            <Link to={`/Main_Menu/${id}/Rides${search}`}>Rides</Link>
          </nav>
          <div className="TheRestOfTheSite">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
}
