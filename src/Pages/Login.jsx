//Login.jsx
import React, { useState } from "react";
import "../Pages/login.css";
import loginImage from "../assets/googleLogo.JPG";
import TextField from "@mui/material/TextField";
import { Details } from "@mui/icons-material";
import { signIn } from "../services/userService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Defining regular expressions for email and password validation:
const Login = () => {
  const emailRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]+(.in)*$/;
  const passwordRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;

  //Initialize state variables using the useState hook for data
  const [data, setData] = useState({ email: "", password: "" });

  //Create a change function to handle changes in the input fields:
  const change = (event) => {
    setData((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  //Initialize state variables using the useState hook for error
  const [error, setError] = useState({
    EmailTrue: false,
    EmailError: "",
    PasswordTrue: false,
    PasswordError: "",
  });

  //Uncomment later on
  const navigate = useNavigate();
  /*
data stores the user's email and password.
error is used to manage error messages for email and password validation.
*/

  //Creating a submit function to handle form submission:
  const submit = async (event) => {
    event.preventDefault(); //// Prevent the default form submission behavior

    //// Validating the user's email and password using regular expressions
    let emailTesting = emailRegex.test(data.email);
    let passwordTesting = passwordRegex.test(data.password);

    //If email is invalid, set an error message
    if (emailTesting === false) {
      setError({
        EmailTrue: true,
        EmailError: "Please enter a valid email address!",
      });
    } else if (passwordTesting === false) {
      //If password is invalid, set an error message
      setError({
        PasswordTrue: true,
        PasswordError: "Please enter a valid password!",
      });
    }
    // If both email and password are valid, proceed with form submission
    if (emailTesting === true && passwordTesting === true) {
      console.log(data); // Log the user's data
      const response = await signIn(data); // Call the signIn function for authentication
      console.log(response); // Log the authentication response
      localStorage.setItem("token", response.data.id); // Stores an authentication token - read about it

      //Uncomment later on
      navigate("/dashboard");
    }

    console.log(data); //Log the user's data again
  };
  return (
    <div className="loginContainer">
      <div className="loginMainContainer">
        <div className="loginMainContainer2">
          <a href="https://www.google.com/">
            <div id="loginGoogleLogo">
              <img src={loginImage} alt="googleLogo" />
            </div>
          </a>
          <div className="login">Login</div>
          <div id="loginText1">Use your Google Account</div>
          <div id="loginTextField1">
            {/* <input type="text" placeholder="Email or phone*" /> */}
            <TextField
              id="email"
              label="Email or phone*"
              variant="outlined"
              onChange={change}
              fullWidth
              error={error.EmailTrue}
              helperText={error.EmailError}
            />
          </div>
          <div id="loginTextField2">
            {/* <input type="password" placeholder="Password*" /> */}
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              onChange={change}
              fullWidth
              type="password"
              error={error.PasswordTrue}
              helperText={error.PasswordError}
            />
          </div>
          <div className="signupForgotPassword">
            <a href="#">forgot Password?</a>
          </div>

          <div className="loginAccount">
            <Link to={"/signup"}>Create account</Link>
            <button onClick={submit} id="loginButton1">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
