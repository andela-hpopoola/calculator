import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Buttons = ({ buttonList }) => (
  <div className="container">
    <div className="row">
      {buttonList.map(button => <Button key={button.name} {...button} />)}
    </div>
  </div>
);

Buttons.propTypes = {
  buttonList: PropTypes.arrayOf(PropTypes.object.isRequired)
};

export default Buttons;
