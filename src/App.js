// App.js
import React from "react";
import Sidebar from "./components/sidebar";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Cats from "./pages/teacher";
import Dogs from "./pages/student" ;
import ErrorPage from "./pages/404";
import GoogleSignUp from "./fierbase/auth";
import Login from "./pages/loginform";
import Login1 from "./pages/teacherlogin";

function App() {
  
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <div style={{ maxWidth: "lg", margin: "auto" }}>
            <Routes>
              <Route
                exact
                path={"React-Sidebar-example/"}
                element={<Home />}
              />
              <Route
                path={"teacher"}
                element={<Cats />}
              />
              <Route
                path={"student"}
                element={<Dogs />}
              />


<Route
                path={"GoogleSignUp"}
                element={<GoogleSignUp />}
              />
              <Route
                path={"Login"}
                element={<Login />}
              />
               <Route
                path={"Login1"}
                element={<Login1/>}
              />
             
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
