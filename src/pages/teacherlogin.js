import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../fierbase/fierbase"; // Assuming you have the correct path to your firebase configuration

const provider = new GoogleAuthProvider();

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teacherData, setTeacherData] = useState(null);


  const handleEmailAuth = async () => {
    const auth = getAuth(app);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = result.user;
      setUser(loggedInUser);
      console.log("User logged in with email:", loggedInUser);
      fetchTeacherData(loggedInUser.email);
    } catch (error) {
      console.error("Email authentication error:", error.message);
    }
  };

  const handleLogOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out");
      setTeacherData(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const fetchTeacherData = (email) => {
    const db = getDatabase();
    const teacherRef = ref(db, "registerforteacher");

    onValue(teacherRef, (snapshot) => {
      try {
        const teacherData = snapshot.val();

        if (teacherData) {
          const teacher = Object.values(teacherData).find(
            (t) => t.email === email
          );

          if (teacher) {
            setTeacherData(teacher);
          } else {
            setTeacherData(null);
          }
        } else {
          setTeacherData(null);
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    });
  };

  useEffect(() => {
    if (user) {
      fetchTeacherData(user.email);
    }
  }, [user]);

  return (
    <div className="loginfirst">
      <h1 style={{ marginTop: "30px" }}>Teacher Login Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName || user.email}!</p>
          <button
            style={{ float: "right", backgroundColor: "blue" }}
            onClick={handleLogOut}
          >
            Log Out
          </button>
          {teacherData && (
            <div>
              <h2>Teacher Data</h2>
              <p>Email: {teacherData.email}</p>
              <p>Teacher Name: {teacherData.Name}</p>
              <p>Teacher ID: {teacherData.teacherIds}</p>
              <p>Status: {teacherData.Status}</p>
              <p>StudentId: {teacherData.StudentId}</p>
              {/* Add more properties as needed */}
            </div>
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
