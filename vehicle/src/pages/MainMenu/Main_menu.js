import React from "react";
import Myimage from "../../pictures/Logo_Hatzerim.jpg";
import { useParams, Route, Routes, Link } from "react-router-dom";
import GetVehicle from "../Get_vehicle";

export default function MainMenu() {
  let { id } = useParams();

  return (
    <div>
      <div>
        <img src={Myimage} alt="Logo"></img>
        <label>Hello {id}</label>
      </div>
      <div>
        <Link>Get More Vehicle</Link>
        <Link></Link>
        <Link></Link>
      </div>
    </div>
  );
}
