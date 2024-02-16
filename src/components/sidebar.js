// Sidebar.js

import React from "react";
import { Link } from "react-router-dom";
import './sidebar.css';
import logoImage from "../pages/img/rr3.png";
const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <h2 className="logode">Shikshak</h2>
    

 <nav>
 <img src={logoImage} alt="Shikshak" className="logo" />
 </nav>
      <ul>
      <li>
      
        <Link to="ErrorPage">
            <span className="right-align">Home</span>
          </Link>

          </li>
        <li>
          <Link to="teacher">
            <span className="right-align">Teacher</span>
          </Link>
        </li>
        <li>
          <Link to="student">
            <span className="right-align">Student</span>
          </Link>
        </li>
      
        <li>
          <Link to="Login">
            <span className="right-align">StudentLogIn</span>
          </Link>
         
        </li>
        <li>
          <Link to="Login1">
            <span className="right-align">TeacherLogIn</span>
          </Link>
         
        </li>
      
      </ul>
    </div>
  );
};

export default Sidebar;
