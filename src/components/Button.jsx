import React from "react";
import PropTypes from "prop-types";

const Button = ({ name, label, type, click }) => {
  const handleClick = () => {
    click({ name, label, type });
  };
  return (
    <div onClick={handleClick} className={"button col-3 button--type-" + type}>
      {label}
    </div>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Button;
