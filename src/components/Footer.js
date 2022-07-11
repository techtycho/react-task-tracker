import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      {location.pathname === "/" ? (
        <Link to="/about">About</Link>
      ) : (
        <Link to="/">Go Back</Link>
      )}
    </footer>
  );
};

export default Footer;
