import React from "react";
import { Link } from 'react-router-dom';
import "./404.css";
/*  import { type } from "@testing-pbrary/user-event/dist/type";*/
class Home extends React.Component {
  render() {
    return (
      <body>


        
 <header class="header">

      <div class="h-content">
        <h1><span>Shikshak</span><br></br>A  Learning Platform</h1>
      <p>Connect, Learn & Grow </p>
      <Link to="Login">
      <button class="btn">Get Started</button>
    </Link>
      </div>

      <div class="image">
        <span class="image__bg"></span>
        
      </div>
 </header>

 <div class="card-container">
  <div class="card1">
 
      <div class="card-content">
      <Link to="Login"> <h3>Student login</h3></Link>
        
        </div>
    </div>
    <div class="card2">
  
      <div class="card-content">
      <Link to="teacher"> <h3>Teacher Login</h3></Link> 
        
        </div>
    </div>
    <div class="card3">
  
      <div class="card-content">
        <h3>Select Subject</h3>
        
        </div>
    </div>

 

  
</div>

<div class="card-details">
  <div class="card4">
 
      <div class="content">
        <p>
        Our student login portal provides personalized learning resources and connects students with experienced teachers to help them succeed in their education.

        </p>
        
        </div>
    </div>
    <div class="card5">
  
      <div class="content">
        <p>
        Our teacher login portal connects experienced educators with motivated students and provides access to teaching resources and professional development opportunities.
          
        </p>
        
        </div>
    </div>
    <div class="card6">
  
      <div class="content">
        <p>Our subject selection feature provides students with access to a wide range of subjects and connects them with specialized teachers who can help them achieve.

        </p>
        
        </div>
    </div>
 {/*footer*/}

  {/*footer*/}

  
</div>
<div class="footerpage">
<footer>
  <div class="row">
  <div class="col">
  <h2 class="logo">Shikshak.Co.In</h2>
  <p>Connect, Learn, Grow</p>
</div>
    <div class="col">
      <h2>Office</h2>
      <p>Milanpur Tiniali</p>
      <p>Chandmari</p>
      <p>Guwahati, PIN 781021, Assam</p>
      <p class="email-id">shikshak.as.classes@gmail.com</p>
      <h4>+91 - 7002074794</h4>
    </div>
    <div class="col">
      <h2>Links</h2>
        <p><a href="Home">Home</a></p>
        <p><a href="home">Privacy & popcy</a></p>
        <p><a href="home">About us</a></p>
        <p><a href="home">Terms & Conditions</a></p>
     
    </div>
    <div class="col">
      <h2>Help & Support</h2>
      
        <p><a href="home">User Guide</a></p>
        <p><a href="home">Refund popcy</a></p>
        <p><a href="home">About us</a></p>
        <p><a href="home">Sitemap</a></p>
        <p><a href="home">Contact Us</a></p>
      
      
    </div>
  </div>
</footer>
</div>


</body>
    );
  }
}

export default Home;
