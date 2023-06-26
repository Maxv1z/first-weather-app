import React from "react";
import "./popup.style.css";

const Popup = () => {
  return (
    <div className="popup disapper">
      <h3 className="popup-heading">City was saved</h3>
      <p className="popup-text">Previous search city was saved</p>
    </div>
  );
};

export default Popup;
