import React, { useState } from "react";
import "../Pages/signup.css";
import signupImage1 from "../assets/googleLogo.JPG";
import signupImage2 from "../assets/signUp logo.JPG";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import { signUp } from "../services/userService";
import { Link } from "react-router-dom";

//To check validation
const Signup = () => {
  const userNameRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]+(.in)*$/;
  const passwordRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;
  const nameRegex = /^[A-Z]{1}[a-z]{2,}$/;

  const [data, setData] = useState({
    // userName: "",
    // signupPassword: "",
    // signupConfirmPassword: "",
    //
    firstName: "",
    lastName: "",
    service: "advance", //read about it - related to backend
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    fNameTrue: false,
    fNameError: "",
    lNameTrue: false,
    lNameError: "",
    userNameTrue: false,
    userNameError: "",
    PasswordTrue: false,
    PasswordError: "",
    NameTrue: false,
    NameError: "",
  });

  const change = (event) => {
    setData((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();

    let fNameTesting = nameRegex.test(data.firstName);
    let lNametesting = nameRegex.test(data.lastName);
    let userNameTesting = userNameRegex.test(data.email);
    let passwordTesting = passwordRegex.test(data.signupPassword);

    if (fNameTesting === false) {
      setError({
        fNameTrue: true,
        fNameError: "Please enter a valid first name.",
      });
    } else if (lNametesting === false) {
      setError({
        lNameTrue: true,
        lNameError: "Please enter a valid last name.",
      });
    } else if (userNameTesting === false) {
      setError({
        usernameTrue: true,
        usernameError: "Please enter a valid username.",
      });
    } else if (passwordTesting === false) {
      setError({
        PasswordTrue: true,
        PasswordError: "Please enter a valid password.",
      });
    }

    if (
      fNameTesting === true &&
      lNametesting === true &&
      userNameTesting === true &&
      passwordTesting === true
    ) {
      console.log(data);
      const response = await signUp(data);
      console.log(response);
    }

    console.log(data);
  };

  return (
    <div className="signupContainer">
      <div className="signupMainContainer">
        <div className="signupMainContainer1">
          <a href="https://www.google.com/">
            <div id="signupGoogleLogo">
              <img src={signupImage1} alt="googleLogo" />
            </div>
          </a>
          <div>Create your Google account</div>
          <div className="signupTextField1">
            {/* <input type="text" id="fName" placeholder="First Name*" /> */}
            <div id="signupFname">
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                onChange={change}
                fullWidth
                error={error.fNameTrue}
                helperText={error.fNameError}
              />
            </div>
            {/* <input type="text" id="lName" placeholder="Last Name*" /> */}
            <div className="signupLname">
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                onChange={change}
                fullWidth
                error={error.lNameTrue}
                helperText={error.lNameError}
              />
            </div>
          </div>
          <div className="signupTextField2">
            {/* <input type="text" id="userName" placeholder="username*" /> */}
            <TextField
              id="userName"
              label="Username"
              variant="outlined"
              onChange={change}
              fullWidth
              error={error.usernameTrue}
              helperText={
                error.usernameError
                  ? error.userNameError
                  : "you can use letters, numbers & periods"
              }
            />
          </div>
          <div className="loginEmailSign">
            <a href="#" id="emailSignup">
              Use my current email instead
            </a>
          </div>

          <div className="signupTextField3">
            <TextField
              id="signupPassword"
              label="Password"
              variant="outlined"
              onChange={change}
              error={error.PasswordTrue}
              helperText={error.PasswordError}
            />

            <TextField
              id="signupConfirmPassword"
              label="Confirm Password"
              variant="outlined"
              onChange={change}
            />
          </div>
          <div className="passwordSubtext">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </div>
          <div className="signupCheckbox1">
            <FormControlLabel
              control={
                <Checkbox
                  size="medium"
                  // checked={showPassword}
                  // onChange={handlePasswordVisibility}
                />
              }
              label="Show password"
            />
          </div>
          <div className="next">
            <Link to={"/"}>Sign in instead</Link>

            <button onClick={submit} id="signupButton1">
              Next
            </button>
          </div>
        </div>
        <div className="signupMainContainer2">
          <img src={signupImage2} alt="signUpLogo" />
          <span id="signupContainer2Text">
            One account. All of Google working for you
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
