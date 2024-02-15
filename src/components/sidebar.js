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
      
        <Link to="React-Sidebar-example/ErrorPage">
            <span className="right-align">Home</span>
          </Link>

          </li>
        <li>
          <Link to="React-Sidebar-example/teacher">
            <span className="right-align">Teacher</span>
          </Link>
        </li>
        <li>
          <Link to="React-Sidebar-example/student">
            <span className="right-align">Student</span>
          </Link>
        </li>
      
        <li>
          <Link to="React-Sidebar-example/Login">
            <span className="right-align">StudentLogIn</span>
          </Link>
         
        </li>
        <li>
          <Link to="React-Sidebar-example/Loginteacher">
            <span className="right-align">TeacherLogin</span>
          </Link>
         
        </li>
      
      </ul>
    </div>
  );
};

export default Sidebar;
