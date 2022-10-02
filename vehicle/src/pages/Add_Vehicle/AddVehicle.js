import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

export default function AddVehicle() {
  const [Type, setType] = useState([]);
  const [Compnay, setCompany] = useState([]);
  const [Size, setSize] = useState([]);
  useEffect(() => {
    axios
      .get("https://vehicle-hatzerim.herokuapp.com/vehicle_size", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSize(res.data);
      });
    axios
      .get("https://vehicle-hatzerim.herokuapp.com/type_vehicle", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setType(res.data);
      });

    axios
      .get("https://vehicle-hatzerim.herokuapp.com/vehicle_Company", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCompany(res.data);
      });
  }, []);
  console.log("hello?");
  console.log(Type, Compnay, Size);

  let count1 = 0;
  let SelectType = Type.map((type) => {
    count1++;
    return (
      <>
        <option key={count1}>{type.type_name}</option>
      </>
    );
  });
  let count = 0;
  let SelectCompany = Compnay.map((comp) => {
    count++;
    return (
      <>
        <option key={count}>{comp.company_name}</option>
      </>
    );
  });

  let count2 = 0;
  let SelectSize = Size.map((size) => {
    count2++;
    return (
      <>
        <option key={count2}>{size.size_name}</option>
      </>
    );
  });

  return (
    <div>
      <select>{SelectCompany}</select>
      <select>{SelectType}</select>
      <select>{SelectSize}</select>
    </div>
  );
}