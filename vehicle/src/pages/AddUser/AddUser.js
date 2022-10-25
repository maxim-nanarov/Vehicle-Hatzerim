import axios from "axios";
import React from "react";
import "./AddUser.scss";

export default function AddUser() {
  const Submit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);
    if (formData.IsAdmin === undefined) {
      formData.IsAdmin = false;
    }
    axios
      .post("http://localhost:4002/User_data", {
        data: formData,
      })
      .then((res) => {
        console.log(res.data);
        console.log("Worked");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="UserOutlineDiv">
      <div className="UserInsertionDiv">
        <h1>Register Users</h1>
        <form onSubmit={Submit} id="addForm">
          <input
            id="UserName"
            name="username"
            type={"text"}
            placeholder="Username: "
          ></input>
          <input
            id="Surname"
            name="surname"
            type={"text"}
            placeholder="Surname: "
          ></input>
          <input
            id="PersonalPhone"
            name="PersonalPhone"
            type={"number"}
            placeholder="Personal phone number: "
          ></input>
          <input
            id="WorkPhone"
            name="WorkPhone"
            type={"number"}
            placeholder="Work phone number: "
          ></input>
          <input
            id="HomePhone"
            name="HomePhone"
            type={"number"}
            placeholder="Home phone number: "
          ></input>
          <div>
            <h2>Is the user going to be admin?</h2>
            <input
              id="IsAdmin"
              name="IsAdmin"
              type={"checkbox"}
              placeholder="is the user is admin? "
            ></input>
          </div>
          <button type="submit" value="Submit" form="addForm">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
