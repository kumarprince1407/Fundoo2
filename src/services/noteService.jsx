//noteService.jsx
import axios from "axios";
//The Axios library, which is a popular JavaScript library for making HTTP requests.
// Axios is commonly used for making API calls in web applications.
let headerConfig;
//The variable headerConfig is declared without initializing it.
// This variable is intended to hold configuration options for HTTP requests,
//specifically headers that may include authentication tokens.

function checkAuth() {
  //Passes the token in header to authenticate
  return (headerConfig = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}
//The function checkAuth() is responsible for creating an HTTP header configuration that includes
// an Authorization header with a token retrieved from the localStorage.
//This is a common pattern for adding authentication headers to requests.

export const createNotes = async (data) => {
  const response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",
    data,
    checkAuth()
  );
  console.log("Response from createNotes:", response); // Log the response
  return response;
};
// This exports a function named createNotes. This function sends an HTTP POST request to a specific
//  URL ("http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes") with the provided data.
// It also includes the authentication headers using the checkAuth() function.
// It logs the response from the server and returns the response object.

export const fetchNotes = async () => {
  const response = await axios.get(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",
    checkAuth()
  );
  return response;
};
//This exports a function named fetchNotes. It sends an HTTP GET request to a specific URL
//("http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList") with authentication
//headers provided by the checkAuth() function. It returns the response object.

export const deleteItem = async (data) => {
  console.log(data);
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",
    data,
    checkAuth()
  );
  return response;
};
// This exports a function named deleteItem. It sends an HTTP POST request to a specific URL
// ("http://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes") with the provided data
// and includes authentication headers from the checkAuth() function.
// It logs the data and returns the response object.

export const archiveItem = async (data) => {
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",
    data,
    checkAuth()
  );
  return response;
};
// This exports a function named archiveItem. It sends an HTTP POST request to a specific URL
// ("http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes") with the provided data
//  and includes authentication headers using the checkAuth() function. It returns the response object.

export const changeColor = async (data) => {
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
    data,
    checkAuth()
  );

  return response;
  // This exports a function named changeColor. It sends an HTTP POST request to a specific URL
  // ("http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes") with the
  // provided data and includes authentication headers using the checkAuth() function.
  // It returns the response object.
};

//permanent delete
export const deleteForever = async (data) => {
  console.log("foreverData", data);
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",
    data,
    checkAuth()
  );
  return response;
};

//update notes
export const updateNotes = async (data) => {
  console.log("updatedData", data);
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes",
    data,
    checkAuth()
  );
  return response;
};
