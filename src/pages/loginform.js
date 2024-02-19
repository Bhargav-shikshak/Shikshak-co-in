import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../fierbase/fierbase"; // Assuming you have the correct path to your firebase configuration
import Greens from "./green";

import "./log.css";

const DisplayComponent = ({ uid, studentName, studentClass }) => {
  return (
    <div className="loginsecond">
      <div className="logthird">
        <p>Student ID: {uid || "N/A"}</p>
        <p>Student name: {studentName || "N/A"}</p>
        <p>Student class: {studentClass || "N/A"}</p>
      </div>
      <h2>Teacher | Coaching Center</h2>
      <div style={{ padding: "1 600px", width: "100%" }}>
        <Greens />
      </div>
    </div>
  );
};

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentData, setStudentData] = useState(null);

  const handleEmailAuth = async () => {
    const auth = getAuth(app);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = result.user;
      setUser(loggedInUser);
      console.log("User logged in with email:", loggedInUser);
    } catch (error) {
      console.error("Email authentication error:", error.message);
    }
  };

  const handleLogOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setUser(null);
      setStudentData(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const fetchStudentDetails = (uid) => {
    const db = getDatabase();
    const userRef = ref(db, "students");

    onValue(userRef, (snapshot) => {
      const studentsData = snapshot.val();
      const student = Object.values(studentsData).find(
        (student) => student.uid === uid
      );

      if (student) {
        setStudentData(student);
      } else {
        setStudentData(null);
      }
    });
  };

  useEffect(() => {
    if (user) {
      fetchStudentDetails(user.uid);
    }
  }, [user]);

  return (
    <div className="loginfirst">
      <h1 style={{ marginTop: "30px" }}>Student Login Page</h1>
      {user ? (
        <div className="loignfirst-details">
          <h4>Welcome, {user.displayName || user.email}!</h4>
         
          <button style={{ float: "right", backgroundColor: "blue" }} onClick={handleLogOut}>Log Out</button>
           {studentData ? (
            <DisplayComponent 
              uid={user.uid}
              studentName={studentData.studentName}
              studentClass={studentData.studentClass}
            />
          ) : (
            <p>No student data found</p>
          )}
        </div>
      ) : (
        <div className="loginend">
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <div>
            <button onClick={handleEmailAuth}>Login with Email</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
