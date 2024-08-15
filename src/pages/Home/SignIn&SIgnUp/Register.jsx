//to make HTTP requests with the base URL from axiosConfig.js
import axios from "../../../axiosConfig";
//to create components.
import React, { useState } from "react";
//Imports the useRef hook, which is used to access DOM elements directly.
import { useRef } from "react";
//Imports Link for navigation between routes and useNavigate to programmatically navigate to different routes.
import { Link, useNavigate } from "react-router-dom";
import About from "../../About/AboutPage";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import classes from "./Register.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

//In summary, this code defines a registration form component that captures user input, validates it, and submits it to a server. If the registration is successful, it redirects the user to the login page.

function SignINSignUP() {
   const [showPassword, setShowPassword] = useState(false);
   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };
  // Initializes the navigate function to redirecting users to the login page after successful registration
  const navigate = useNavigate();

  // Creates references for the email, first name, last name, username, and password input fields and to directly access the DOM element's value.
  const userEmail = useRef(null);
  const userFirstName = useRef(null);
  const userLastName = useRef(null);
  const userName = useRef(null);
  const userPassword = useRef(null);

  //to handle form submission.
  async function handleSubmit(e) {
    //Prevents the default form submission behavior to validating input or sending data to a server
    e.preventDefault();
    //Retrieves the current value of the email,FirstName,LastName,userName &Password input field.
    const userEmailValue = userEmail.current.value;
    const userFirstNameValue = userFirstName.current.value;
    const userLastNameValue = userLastName.current.value;
    const userNameValue = userName.current.value;
    const userPasswordValue = userPassword.current.value;
    //Checks if any of the form fields are empty
    if (
      !userEmailValue ||
      !userFirstNameValue ||
      !userLastNameValue ||
      !userNameValue ||
      !userPasswordValue
    ) {
      alert("Please provide all required information");
      return; //Stops further execution if validation fails
    }
    // try to submit data to the server and handle any errors that occur during the request
    try {
      //Sends a POST request to the /user/register endpoint with the form data.
      await axios.post("/user/register", {
        email: userEmailValue,
        first_name: userFirstNameValue,
        last_name: userLastNameValue,
        username: userNameValue,
        password: userPasswordValue,
      });
      //Shows a success message if the registration is successful.
      alert("Registered successfully.please login");
      // Redirects the user to the login page.
      navigate("/login");

      //to handle errors if the request fails.
    } catch (error) {
      alert("something went wrong!");
      console.log(error.response); //Logs the error response from the server.
      console.log(error.message);
    }
  }

  return (
    <>
      <section className={classes.register_contanier}>
        <Header />
        <div className="container px-md-5">
          <div className="row">
            <div className="col-12 col-md-5 shadow auth mx-md-4 ">
              <div className={classes.login_inner}>
                <div className={classes.Carousel_inner}>
                  <div className="carousel-item active">
                    <h5>Join the network</h5>
                    <div>
                      Already have an account?
                      <span>
                        <Link to={"/login"}>Sign in</Link>
                      </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className={classes.from_input}>
                        <input
                          type="Email"
                          placeholder="Email"
                          ref={userEmail}
                        />
                      </div>
                      <br />
                      <div className={classes.fNlN}>
                        <div className={classes.from_input}>
                          <input
                            type="text"
                            placeholder="Firstname"
                            ref={userFirstName}
                          />
                        </div>
                        <br />
                        <div className={classes.from_input}>
                          <input
                            type="text"
                            placeholder="lastname"
                            ref={userLastName}
                          />
                        </div>
                      </div>
                      <br />
                      <div className={classes.from_input}>
                        <input
                          type="text"
                          placeholder="username"
                          ref={userName}
                        />
                      </div>
                      <br />
                      <div
                        className={`${classes.from_input} ${classes.password}`}
                      >
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="password"
                          ref={userPassword}
                        />
                        <span
                          className={classes.password_toggle}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FiEye /> : <FiEyeOff />}
                        </span>
                        {/* {error && (
                          <span style={{ color: "red" }}>{error}</span>
                        )} */}
                      </div>
                      <div className={classes.agreement}>
                        <p>
                          <span>
                            I agree to the <Link>Privacy Policy</Link>
                            and <Link>terms and service</Link>
                          </span>
                        </p>
                      </div>
                      <div className={classes.btn}>
                        <button type="submit">Agree and Join</button>
                      </div>
                    </form>
                    <span>
                      <Link to={"/login"}>Already have an account ?</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ">
              <About />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default SignINSignUP;

