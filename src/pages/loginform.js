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
import Greens from "./green";
import democls from "./democlass";
import "./log.css";

const provider = new GoogleAuthProvider();

const DisplayComponent = ({ user, studentId, studentName, studentClass }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [teacherData, setTeacherData] = useState(null);
  const [image, setImage] = useState(null);
  // Function to handle the submit button click
  const handleSubmit = () => {
    // Implement your logic here for handling the submit button click
    console.log("Submitted with selected option:", selectedOption);
  };

  // Fetch teacher data based on studentId
  const fetchTeacherData = () => {
    const db = getDatabase();
    const teacherRef = ref(db, "registerforteacher");

    onValue(teacherRef, (snapshot) => {
      const teacherData = snapshot.val();

      if (teacherData) {
        const teacher = Object.values(teacherData).find(
          (t) => t.StudentId === studentId
        );

        if (teacher) {
          setTeacherData(teacher);
        } else {
          setTeacherData(null);
        }
      } else {
        // Handle the case when the database is empty
        setTeacherData(null);
      }
    });
  };

  useEffect(() => {
    if (studentId && studentName && studentClass) {
      // Fetch teacher data on component mount or when studentId changes
      fetchTeacherData();
    }
   
  }, [studentId, studentName, studentClass ]);

  return (
    
    <div className="loginsecond">
      <div className="logthird">
        <p>Student ID: {studentId || "N/A"}</p>
        <p>Student name: {studentName || "N/A"}</p>
        <p>Student class: {studentClass || "N/A"}</p>
    </div>
      <h2>Teacher  | Coaching Center</h2>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
   <div style={{ 

  padding: "10px",
  width: "100%",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
 
}}>
        <Greens />
      </div>
    

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

  const handleGoogleAuth = async () => {
    const auth = getAuth(app);
    try {
      // Set the persistence to 'none' or 'local'
      await setPersistence(auth, browserSessionPersistence);

      const result = await signInWithPopup(auth, provider);
      const newUser = result.user;
      setUser(newUser);
      console.log("User signed in with Google:", newUser);

      // Fetch student details using the email
      fetchStudentDetails(newUser.email);
    } catch (error) {
      console.error("Google authentication error:", error.message);
    }
  };

  const handleEmailAuth = async () => {
    const auth = getAuth(app);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = result.user;
      setUser(loggedInUser);
      console.log("User logged in with email:", loggedInUser);

      // Fetch student details using the email
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
      // Fetch student details on component mount if user is already authenticated
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
            user={user}
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
