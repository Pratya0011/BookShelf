import React from "react";
import "../Style/Loading.css";

function Loader({ visible = false }) {
  return (
    <div
      className="loader-cointainer"
      style={{ display: visible ? "flex" : "none" }}
    >
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
