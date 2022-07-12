import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, color, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      style={disabled ? {} : { backgroundColor: color }}
      className={`btn ${disabled && "disabled"}`}
      title={disabled && "Cannot connect to the server"}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "Button",
  color: "steelblue",
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
