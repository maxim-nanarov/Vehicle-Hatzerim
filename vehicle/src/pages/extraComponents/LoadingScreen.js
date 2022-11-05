import React from "react";
import "./LoadingScreen.scss";

export default function LoadingScreen() {
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
