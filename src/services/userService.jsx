//userService.jsx
import axios from "axios";

export let signIn = async (data) => {
  try {
    const response = await axios.post(
      "http://fundoonotes.incubation.bridgelabz.com/api/user/login",
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("Error in signIn: ", error);
    throw error;
  }
};
export let signUp = async (data) => {
  try {
    const response = await axios.post(
      "http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("Error in signUP:", error);
    throw error;
  }
};
