import React from "react";
import { useNavigate } from "react-router";
import "./index.scss";

const NoMatch = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };
  return (
    <div className="nomatch">
      <h1 className="nomatch__title">Oops!</h1>
      <div className="nomatch__description">
        <p className="title">404 - PAGE NOT FOUND</p>
        <p>The page you are looking for might have been removed</p>
        <p>had its name changed or is temporarily unavailable</p>
      </div>
      <button className="tohomepage" onClick={handleRedirect}>
        GO TO HOMEPAGE
      </button>
    </div>
  );
};

export default NoMatch;
