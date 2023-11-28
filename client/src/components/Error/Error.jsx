import "./Error.scss";
import React from "react";

const Error = ({ error }) => {
  return (
    <div className="error-container">
      <h3 className="title">Ooops, something went wrong...</h3>
      <p>{error}</p>
    </div>
  );
};

export default Error;
