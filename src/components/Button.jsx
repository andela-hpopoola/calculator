import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const handleClick = () => {
    props.click(props.name, props.label);
  };
  return (
    <div
      onClick={handleClick}
      className={"button col-3 button--color-" + props.color}
    >
      {props.label}
    </div>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

Button.defaultProps = {
  color: ""
};

export default Button;
