import React, { useEffect, useState } from "react";
import axios from "axios";
import Myimage from "../../pictures/Logo_Hatzerim.jpg";
import "./Login.scss";

export default function Login() {
  const [users, setUser] = useState();
  useEffect(() => {
    axios
      .get("https://vehicle-hatzerim.herokuapp.com/users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  const Submit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);

    let password = formData.password;
    console.log(password);
    let flag = false;
    let userFlag;

    users.forEach((user) => {
      console.log(user.user_id);
      if (user.user_id === parseInt(password)) {
        flag = true;
        userFlag = user;
      }
    });
    if (flag) {
      window.location.href = `${origin}/Main_Menu/${userFlag.user_id}`;
      alert("Welcome : " + userFlag.user_name + " " + userFlag.user_surname);
    } else {
      alert("you enterd the wrong password");
    }
  };

  console.log(users);
  return (
    <div className="MainDiv">
      <form onSubmit={Submit} id="addForm">
        <div className="PictureDiv">
          <img src={Myimage} alt="Logo"></img>
        </div>
        <div className="LoginDiv">
          <label>Login: </label>
          <input
            type="Number"
            name="password"
            placeholder="Password please"
            id="password"
          />
        </div>
      </form>
      <button className="Button" type="submit" value="Submit" form="addForm">
        Enter
      </button>
    </div>
  );
}
