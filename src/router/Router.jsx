//Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Setting up routing for a React application using the react-router-dom library.
// It defines various routes and associates them with specific components to render based on the URL path.
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Dashboard from "../components/Dashboard";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    // Within the Router component, we create a BrowserRouter. This component provides the routing
    // infrastructure for our application and should wrap all our route definitions.
    <BrowserRouter>
      <Routes>
        {/* Defining the route for the root URL ("/") using the <Route> component */}

        <Route
          path="/"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

// Routes is a container component that is used to define multiple route configurations for
// our application. It allows yus to group multiple Route components together and specify
//  different routes for different parts of our application.

// We typically use Routes at the top level of our routing configuration to define the overall
// structure of your routes. Within Routes, we can nest Route components to define the specific
//  routes for different parts of your application.

export default Router;
