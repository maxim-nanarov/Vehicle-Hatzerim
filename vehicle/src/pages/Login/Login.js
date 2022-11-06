import React, { useEffect, useState } from "react";
import axios from "axios";
import Myimage from "../../pictures/Logo_Hatzerim.jpg";
import "./Login.scss";
// import MainMenu from "../MainMenu/Main_menu";

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
    console.log(users);
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);

    let password = formData.password;
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
  if (users !== undefined) {
    return (
      <div className="MainDiv">
        <div className="SubmitLogin">
          <img className="LoginImage" src={Myimage} alt="Logo"></img>

          <form className="LoginForm" onSubmit={Submit} id="addForm">
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
          <button
            className="Button"
            type="submit"
            value="Submit"
            form="addForm"
          >
            Enter
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="rotating">
        <h1>Loading...</h1>
        <div className="first">
          <div className="second">
            <div className="third"></div>
          </div>
        </div>
      </div>
    );
  }
}
