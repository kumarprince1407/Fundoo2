//App.js
import logo from "./logo.svg";
import "./App.css";

//Uncomment if not working
// import { BrowserRouter as Router } from "react-router-dom"; // Import the Router component

import TakeNote1 from "./components/TakeNote1";
import Login from "./Pages/Login";
import TakeNote2 from "./components/TakeNote2";
import Signup from "./Pages/Signup";
import TakeNote3 from "./components/TakeNote3";
import Router from "./router/Router";

function App() {
  return (
    // <Router />
    // <div className="App">
    //   {/* <Login />
    //   <Signup /> */}
    //   {/* <PrimarySearchAppBar /> */}
    //   {/* <Drawer /> */}
    //   {/* <MiniDrawer2 /> */}
    //   {/* <Dashboard /> */}
    // </div>

    //working start
    // <Router>
    //   <div className="App">
    //     <TakeNote1 />
    //     <TakeNote2 />
    //     {/* <TakeNote3 /> */}
    //     <Login />
    //     <Signup />
    //   </div>
    // </Router>
    //working end
    <Router />
  );
}
export default App;
