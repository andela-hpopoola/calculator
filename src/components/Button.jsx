import React from "react";
import PropTypes from "prop-types";

const Button = ({ label }) => {
  return <div className="button col-3">{label}</div>;
};

Button.propTypes = {
  label: PropTypes.string.isRequired
};

export default Button;
