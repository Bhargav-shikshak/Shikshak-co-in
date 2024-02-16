import React, { Component } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { app } from "../fierbase/fierbase";
import "./teacher.css";

class Teachers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherId: "", // No need to manually set this
      teacherName: "",
      email: "",
      password: "",
      image: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      qualification: "",
      phone: "",
      subject: "",
      additionalNote: "",
      teacherData: null,
    };
  }

  componentDidMount() {
    const teachersRef = ref(getDatabase(), "teachers");

    onValue(teachersRef, (snapshot) => {
      this.setState({ teacherData: snapshot.val() });
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
      teacherName,
      email,
      password,
      image,
      address,
      city,
      state,
      pincode,
      qualification,
      subject,
      additionalNote,
      phone,
    } = this.state;

    const auth = getAuth(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const teachersRef = ref(getDatabase(), "teachers");

      push(teachersRef, {
        uid: user.uid, // Automatically assigned UID
        teacherName,
        email,
        image,
        address,
        city,
        state,
        pincode,
        qualification,
        subject,
        additionalNote,
        phone,
      });

      this.setState({
        teacherName: "",
        email: "",
        password: "",
        image: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        qualification: "",
        phone: "",
        subject: "",
        additionalNote: "",
      });

      console.log("Teacher signed up successfully:", user);

      window.location.href = "Login1";
    } catch (error) {
      console.error("Teacher sign-up error:", error.message);
    }
  };

  render() {
    const {
      teacherName,
      email,
      password,
      address,
      city,
      state,
      pincode,
      qualification,
      subject,
      phone,
      teacherData,
    } = this.state;

    return (
      <>
        <div className="teabody">
          <div className="teacontainer">
            <div className="title">
              <h2>ADD TEACHER</h2>
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Enter Teacher Name</span>
                  <input
                    type="text"
                    name="teacherName"
                    value={teacherName}
                    onChange={this.handleChange}
                    placeholder="Enter your name"
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
                    placeholder="Enter your email"
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
                    placeholder="Enter at least 7 digits or alphabets"
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
                    placeholder="Enter your Phone number"
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
                    accept=".jpg, .jpeg, .PNG"
                    onChange={this.handleImageChange}
                    required
                  />
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
                    placeholder="Enter your Address"
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
                    placeholder="Enter your City"
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
                    placeholder="Enter your state"
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
                  <span className="details">Qualification</span>
                  <input
                    type="text"
                    name="qualification"
                    value={qualification}
                    onChange={this.handleChange}
                    placeholder="Enter qualification"
                    required
                  />
                </div>
              </div>

              <div className="user-details">
                <div className="address-title">
                  <h3>SUBJECT DETAILS</h3>
                </div>
                <div className="input-box">
                  <span className="details">Select Subject</span>
                  <select
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="math">Math</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="computerScience">Computer Science</option>
                    <option value="english">English</option>
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                    <option value="economics">Economics</option>
                    <option value="politicalScience">Political Science</option>
                    <option value="assamese">Assamese</option>
                  </select>
                </div>
              </div>

              <div className="button">
                <button type="submit">Add Teacher</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Teachers;

