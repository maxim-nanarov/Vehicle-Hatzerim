import React, { useState, useEffect } from "react";
import axios from "axios";
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
  console.log(Vehicles);
  return <div>Rides</div>;
}
