import React, { Component } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../fierbase/fierbase";
import "./student.css";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: "",
      parentName: "",
      age: "",
      phone: "",
      alternatePhone: "",
      email: "",
      password: "",
      image: null,
      address: "",
      city: "",
      state: "",
      pincode: "",
      college: "",
      cgpaPercentage: "",
      studentClass: "",
      selectedSubject: "",
      classRequirement: "",
      additionalNote: "",
      studentData: null,
    };
  }

  componentDidMount() {
    const studentsRef = ref(getDatabase(), "students");

    onValue(studentsRef, (snapshot) => {
      this.setState({ studentData: snapshot.val() });
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      studentName,
      parentName,
      age,
      phone,
      alternatePhone,
      email,
      password,
      image,
      address,
      city,
      state,
      pincode,
      college,
      cgpaPercentage,
      studentClass,
      selectedSubject,
      classRequirement,
      additionalNote,
    } = this.state;

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      const studentsRef = ref(getDatabase(), "students");

      push(studentsRef, {
        studentId: uid, // Setting studentId as UID
        studentName,
        parentName,
        age,
        phone,
        alternatePhone,
        email,
        password,
        image,
        address,
        city,
        state,
        pincode,
        college,
        cgpaPercentage,
        studentClass,
        selectedSubject,
        classRequirement,
        additionalNote,
        uid,
      });

      this.setState({
        // Clearing the form fields
        studentName: "",
        parentName: "",
        age: "",
        phone: "",
        alternatePhone: "",
        email: "",
        password: "",
        image: null,
        address: "",
        city: "",
        state: "",
        pincode: "",
        college: "",
        cgpaPercentage: "",
        studentClass: "",
        selectedSubject: "",
        classRequirement: "",
        additionalNote: "",
      });

      console.log("Student added successfully!");
      window.location.href = "Login";
    } catch (error) {
      console.error("Error adding student:", error.message);
    }
  };

  render() {
    const {
      studentName,
      parentName,
      age,
      phone,
      alternatePhone,
      email,
      password,
      image,
      address,
      city,
      state,
      pincode,
      college,
      cgpaPercentage,
      studentClass,
      selectedSubject,
      classRequirement,
      additionalNote,
      studentData,
    } = this.state;

    return (
      <div className="teabody">
        <div className="teacontainer">
          <div className="title">
            <h2>ADD STUDENT</h2>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Student Name</span>
                <input
                  type="text"
                  name="studentName"
                  value={studentName}
                  onChange={this.handleChange}
                  placeholder="Enter student's name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Parent Name</span>
                <input
                  type="text"
                  name="parentName"
                  value={parentName}
                  onChange={this.handleChange}
                  placeholder="Enter parent's name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Age</span>
                <input
                  type="text"
                  name="age"
                  value={age}
                  onChange={this.handleChange}
                  placeholder="Enter age"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone</span>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={this.handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Alternate Phone number</span>
                <input
                  type="text"
                  name="alternatePhone"
                  value={alternatePhone}
                  onChange={this.handleChange}
                  placeholder="Enter alternate phone number"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Image</span>
                <label htmlFor="fileInput" className="custom-file-input">
                  Choose File
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept=".jpg, .jpeg, .png"
                  onChange={this.handleImageChange}
                  required
                />
                {image && (
                  <img src={image} alt="Preview" className="preview-image" />
                )}
              </div>
            </div>

            <div className="user-address">
              <div className="address-title">
                <h3>ADDRESS DETAILS</h3>
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={this.handleChange}
                  placeholder="Enter address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">City</span>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={this.handleChange}
                  placeholder="Enter city"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">State</span>
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={this.handleChange}
                  placeholder="Enter state"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Pincode</span>
                <input
                  type="text"
                  name="pincode"
                  value={pincode}
                  onChange={this.handleChange}
                  placeholder="Enter pincode"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">School/College</span>
                <input
                  type="text"
                  name="college"
                  value={college}
                  onChange={this.handleChange}
                  placeholder="Enter college name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">CGPA/Percentage</span>
                <input
                  type="text"
                  name="cgpaPercentage"
                  value={cgpaPercentage}
                  onChange={this.handleChange}
                  placeholder="Enter CGPA/Percentage"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Class:</span>
                <input
                  type="text"
                  name="studentClass"
                  value={studentClass}
                  onChange={this.handleChange}
                  placeholder="Enter class"
                  required
                />
              </div>
            </div>

            <div className="user-checkbox">
              <div className="checkbox-details">
                <h3>SUBJECT DETAILS</h3>
              </div>
              <div className="input-box">
                <span className="details">Select Subject:</span>
                <select
                  name="selectedSubject"
                  value={selectedSubject}
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Math">Math</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Assamese">Assamese</option>
                  <option value="Social Science">Social Science</option>
                </select>
              </div>
            </div>

            <div className="user-require">
              <div className="input-box">
                <span className="details">Class Requirement:</span>
                <input
                  type="text"
                  name="classRequirement"
                  value={classRequirement}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Additional Note:</span>
                <input
                  type="text"
                  name="additionalNote"
                  value={additionalNote}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="button">
              <button type="submit">Add Student</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Students;

