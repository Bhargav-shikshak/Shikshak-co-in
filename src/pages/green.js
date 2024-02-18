import React, { Component } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Popup from "./pop"; // Import the Popup component
import "./green.css";
// Import statements remain the same

class Greens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherData: null,
      selectedTeacher: null,
      displayDetails: false,
      selectedTeacherForPopup: null, // Track the selected teacher for popup
    };
  }

  componentDidMount() {
    const teachersRef = ref(getDatabase(), "teachers");

    onValue(teachersRef, (snapshot) => {
      this.setState({ teacherData: snapshot.val() });
    });
  }

  handleRowClick = (teacherId) => {
    this.setState({ selectedTeacher: teacherId, displayDetails: true });
  };

  handleRegisterClick = (teacherId) => {
    this.setState({ selectedTeacherForPopup: teacherId });
  };

  closePopup = () => {
    this.setState({ selectedTeacherForPopup: null });
  };

  render() {
    const { teacherData, selectedTeacher, displayDetails, selectedTeacherForPopup } = this.state;

    return (
      <div className="greens">
        <h1 className="title">TEACHERS PAGE</h1>
        <div>
          <h2>Teacher Data:</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                 <th>Image</th>
                  <th>Name</th>
                  <th>Qualification</th>
                  <th>subject</th>
               
                  
                  <th>Actions</th>
         <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {teacherData &&
                  Object.entries(teacherData).map(([key, value]) => (
                    <tr key={key} onClick={() => this.handleRowClick(key)}>
                        <td>
                  <img
                    src={value.image}
                    alt="Teacher"
                    className="teacher-image"
                  />
                </td>
                      <td>{value.teacherName}</td>
                      <td>{value.qualification}</td>
                      <td>{value.subject}</td>
                     
                      
                      <td>
                        <button onClick={(e) => {
                          e.stopPropagation();
                          this.handleRegisterClick(key);
                        }}>Register</button>
                      </td>
                       <td>{value.additionalNote}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {displayDetails && selectedTeacher && teacherData && teacherData[selectedTeacher] && (
              <div>
                <h3>{teacherData[selectedTeacher].teacherName}</h3>
                <p>
                  <strong>Teacher ID:</strong> {teacherData[selectedTeacher].teacherId}
                </p>
                {/* Render other details */}
              </div>
            )}
            {selectedTeacherForPopup && teacherData && teacherData[selectedTeacherForPopup] && (
              <Popup
                teacherName={teacherData[selectedTeacherForPopup].teacherName}
                address={teacherData[selectedTeacherForPopup].address}
                phone={teacherData[selectedTeacherForPopup].phone}
                teacherId={teacherData[selectedTeacherForPopup].uid}
                email={teacherData[selectedTeacherForPopup].email}
                qualification={teacherData[selectedTeacherForPopup]. qualification}

                onClose={this.closePopup}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Greens;
