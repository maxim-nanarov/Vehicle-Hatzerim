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
    let name;
    let surname;
    users.forEach((user) => {
      console.log(user.user_id);
      if (user.user_id === parseInt(password)) {
        flag = true;
        name = user.user_name;
        surname = user.user_surname;
      }
    });
    if (flag) {
      window.location.href = `${origin}/Main_Menu`;
      alert("Welcome : " + name + " " + surname);
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
            placeholder="Please enter here your passwrod"
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
