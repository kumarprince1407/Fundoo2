import React from "react";

// Creating custom React component named AuthRoute that handles conditional routing based on
//the presence of a user token in localStorage

import { Navigate } from "react-router-dom";
// The Navigate component is used for programmatic navigation to different
// routes within a React application.

const AuthRoute = ({ children }) => {
  // The AuthRoute functional component that takes a single argument, children.
  // In React, children is a special prop that represents the content or components
  // nested within the AuthRoute component.

  if (!localStorage.getItem("token")) {
    return children;
  }
  // If there is no token, it allows the rendering of the nested children components,
  // effectively allowing access to the protected route.
  return <Navigate to={"/dashboard"} />;
  // If the user is authenticated (i.e., there is a token in local storage), the component
  // returns a <Navigate> component, which is used to programmatically redirect the user
  // to a specified route.
};

export default AuthRoute;
