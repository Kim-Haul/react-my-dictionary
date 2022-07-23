import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const Spinner = (props) => {
  return (
    <div className="spinner_container">
      <FontAwesomeIcon icon={faClockRotateLeft} className="spinner" />
    </div>
  );
};

export default Spinner;
