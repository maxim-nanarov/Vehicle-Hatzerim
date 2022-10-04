import React from "react";
import "./AddDestination.scss";
import axios from "axios";
//To Do: Add an Edit and Delete table.
export default function AddDestination() {
  return (
    <div className="MainDivDestinaion">
      <div className="Submit-div">
        <form id="AddForm" onSubmit={onSubmit}>
          <h1>Add Destionaion: </h1>
          <input id="name" name="name" placeholder="Name" />
          <input type="number" id="score" name="score" placeholder="Score" />
          <button form="AddForm" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function onSubmit(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  formData = Object.fromEntries(formData);
  let score = Number(formData.score);
  console.log(formData.name, score);
  if (typeof score !== "number") {
    alert("you have to put a number in the score");
  } else {
    axios
      .post("http://localhost:4002/Destionaion_Data", {
        headers: {
          "Content-Type": "application/json",
        },
        Data: {
          name: formData.name,
          score: score,
        },
      })
      .then((res) => {
        console.log("Worked V 1");
        console.log(res);
      })
      .catch((error) => {
        console.log("error =>");
        console.log(error.response);
      });
  }
}
