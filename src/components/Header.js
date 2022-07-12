import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onShowForm, showAddTask, error }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          disabled={error}
          onClick={onShowForm}
          color={showAddTask ? "red" : "green"}
          text={showAddTask ? "Close" : "Add"}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
