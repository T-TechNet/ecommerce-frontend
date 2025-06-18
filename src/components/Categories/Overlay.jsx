import React from "react";
import "./bottomsheet.css";

const Overlay = ({ open, setOpen, status }) => {
  return (
    <div
      className={`overlay ${open ? "open" : ""}`}
      onClick={() => setOpen(false)}
    ></div>
  );
};

export default Overlay;
