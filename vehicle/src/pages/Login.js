import React, { useEffect, useState } from "react";
import axios from "axios";

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
    users.forEach((user) => {
      console.log(user.user_id);
      if (user.user_id === parseInt(password)) {
        return <label>found</label>;
      }
    });
  };

  console.log(users);
  return (
    <div>
      <form onSubmit={Submit} id="addForm">
        <div>
          <img src="../pictures/Logo_Hatzerim.jpg" alt="Logo"></img>
        </div>
        <div>
          <label>Login: </label>
          <input
            type="Number"
            name="password"
            placeholder="Please enter here your passwrod"
            id="password"
          />
        </div>
      </form>
      <button type="submit" value="Submit" form="addForm">
        Enter
      </button>
    </div>
  );
}
