import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import "./pop.css"; // Add the CSS for styling the popup

const Popup = ({ teacherName,address,phone,teacherId, email, qualification,onClose }) => {
  // State to store input values
 
  const [Request, setRequest] = useState("Request");
  const [studentId, setStudentId] = useState("");
  // Function to handle form submission
  const handleSubmit = () => {
    // Firebase Realtime Database setup
    const db = getDatabase();
    const registerRef = ref(db, 'registerforteacher');

    // Push data to the database
    push(registerRef, {
      StudentId :studentId,
      teacherIds: teacherId,
      Name:  teacherName,
      Contact:phone,
      Location: address,
      Status:Request,
       email:email,
       qualification: qualification,
     

      timestamp: Date.now(),
    });

    // Close the popup
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Registration for {teacherName}</h2>
        <h3>Registration for {address}</h3>
        {/* Add your registration form or content here */}
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId} placeholder="Copy your StudentID & paste"
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div>
          <label >Teacher ID:</label>
          <input
            type="text"
            id="TeacherId"
            value={teacherId}
           
          />
        </div>
        <div>
          <label >Name:</label>
          <input
            type="text"
            id="Name"
            value={teacherName}
           
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            id="Contact"
            value={phone}
          
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            id="Location"
            value={address}
          
          />
        </div>
        <div>
          <label>email:</label>
          <input
            type="text"
            id="email"
            value={address}
          
          />
        </div>
       
        <div>
          <label>qualification:</label>
          <input
            type="text"
            id="qualification"
            value={address}
          
          />
        </div>

        <div>
          <label>Status:</label>
          <input
            type="text"
            id="Status"
            value={Request}
            onChange={(e) => setRequest(e.target.value)}
          />
        </div>

        
        
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
