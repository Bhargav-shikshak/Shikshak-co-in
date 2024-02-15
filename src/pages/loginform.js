import React, { useState, useEffect } from "react";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, signOut, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../fierbase/fierbase"; // Assuming you have the correct path to your firebase configuration
import Greens from "./green";
import "./log.css";

const provider = new GoogleAuthProvider();

const DisplayComponent = ({ studentId, studentName, studentClass }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = () => {
    console.log("Submitted with selected option:", selectedOption);
  };

  return (
    <div className="loginsecond">
      <div className="logthird">
        <p>Student ID: {studentId || "N/A"}</p>
        <p>Student name: {studentName || "N/A"}</p>
        <p>Student class: {studentClass || "N/A"}</p>
      </div>
      <h2>Teacher  | Coaching Center</h2>
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
  const [studentId, setStudentId] = useState(null);
  const [studentName, setStudentName] = useState(null);
  const [studentClass, setStudentClass] = useState(null);


  const handleEmailAuth = async () => {
    const auth = getAuth(app);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = result.user;
      setUser(loggedInUser);
      console.log("User logged in with email:", loggedInUser);
      fetchStudentDetails(loggedInUser.email);
    } catch (error) {
      console.error("Email authentication error:", error.message);
    }
  };

  const handleLogOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setUser(null);
      setStudentId(null);
      setStudentName(null);
      setStudentClass(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const fetchStudentDetails = (email) => {
    const db = getDatabase();
    const userRef = ref(db, "students");

    onValue(userRef, (snapshot) => {
      const studentsData = snapshot.val();
      const student = Object.values(studentsData).find(
        (student) => student.email === email
      );

      if (student) {
        setStudentId(student.studentId);
        setStudentName(student.studentName);
        setStudentClass(student.studentClass);
      } else {
        setStudentId(null);
        setStudentName(null);
        setStudentClass(null);
      }
    });
  };

  useEffect(() => {
    if (user) {
      fetchStudentDetails(user.email);
    }
  }, [user]);

  return (
    <div className="loginfirst">
      <h1 style={{marginTop:"30px"}}>Student Login Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName || user.email}!</p>
          <button style={{float:"right", backgroundColor:"blue"}} onClick={handleLogOut}>Log Out</button>
          <DisplayComponent
            studentId={studentId}
            studentName={studentName}
            studentClass={studentClass}
          />
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
