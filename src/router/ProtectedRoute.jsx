import React from "react";
// This code defines a custom React component named ProtectedRoute that handles conditional
// routing based on the presence of a user token in localStorage.
// Importing the Navigate component from the react-router-dom library.
import { Navigate } from "react-router-dom";

//Defining a functional component named ProtectedRoute. It takes an object with a
//single property 'children' as its argument. The children prop is a special prop
//that represents the content rendered between the opening and closing tags of a component.
const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    return children;
  }
  //If there is no token in the localStorage, this block of code is executed,
  // and it returns a <Navigate /> component with a to prop set to "/".
  //This effectively redirects the user to the root path ("/"),
  return <Navigate to={"/"} />;
};

export default ProtectedRoute;
