import React from "react";
import PropTypes from "prop-types";

const Display = ({ calculation, result }) => {
  return (
    <section className="display">
      <header className="display__calculation">{calculation}</header>
      <main className="display__result">{result}</main>
    </section>
  );
};

Display.propTypes = {
  calculation: PropTypes.string,
  result: PropTypes.string
};

Display.defaultProps = {
  calculation: "",
  result: "0"
};

export default Display;
