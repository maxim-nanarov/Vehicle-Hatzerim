import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "./Add_Vehicle.scss";

export default function AddVehicle() {
  const [Type, setType] = useState([]);
  const [Company, setCompany] = useState([]);
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
  let SelectCompany = Company.map((comp) => {
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
  //To do: Add to the vehicle Table Plate number
  //and add to the Data Base an plate number coulumn.
  return (
    <>
      <div className="MainAddVehicleDiv">
        <div className="explenation">
          <p>
            Welcome to the Admin Area, this page is the Add vehicle page, if you
            want to add any new vehicle you're more than welcome to add one
            here.
          </p>
        </div>
        <div className="custom-select">
          <form id="AddForm" onSubmit={onSubmit}>
            <input
              className="Add_Vehicle_Plate_number"
              placeholder="Plate number: "
            ></input>
            <select className="Add_Vehicle_select" id="Company" name="Company">
              {SelectCompany}
            </select>
            <select className="Add_Vehicle_select" id="Type" name="Type">
              {SelectType}
            </select>
            <select className="Add_Vehicle_select" id="Size" name="Size">
              {SelectSize}
            </select>
            <button form="AddForm" type="submit" value="Submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );

  function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);
    console.log(formData.Type, formData.Size, formData.Company);

    let TypeID = 0;
    let CompanyID = 0;
    let SizeID = 0;

    Size.forEach((size) => {
      if (size.size_name === formData.Size) {
        SizeID = size.size_id;
      }
    });

    Company.forEach((comp) => {
      if (comp.company_name === formData.Company) {
        CompanyID = comp.company_id;
      }
    });

    Type.forEach((type) => {
      if (type.type_name === formData.Type) {
        TypeID = type.type_id;
      }
    });

    console.log("Type id: ", TypeID);
    console.log("Company id: ", CompanyID);
    console.log("Size id: ", SizeID);

    axios
      .post("https://vehicle-hatzerim.herokuapp.com/Add_Vehicle", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          Type_Id: TypeID,
          Company_Id: CompanyID,
          Size_Id: SizeID,
        },
      })
      .then((res) => {
        console.log("then => ", res);
      })
      .catch((err) => {
        console.log("error => ", err);
      });
  }
}
