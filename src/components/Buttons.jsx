import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Buttons = ({ buttonList, onClick }) => (
  <div className="container">
    <div className="row">
      {buttonList.map(button => (
        <Button click={onClick} key={button.name} {...button} />
      ))}
    </div>
  </div>
);

Buttons.propTypes = {
  buttonList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  ),
  onClick: PropTypes.func.isRequired
};

export default Buttons;
