//Dashboard.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "./Header";
import MiniDrawer2 from "./Drawer";
import TakeNote1 from "./TakeNote1";
import TakeNote2 from "./TakeNote2";

import TakeNote3 from "./TakeNote3";

import noteService, {
  fetchNotes,
  deleteItem,
  archiveItem,
  changeColor,
  deleteForever,
  updateNotes,
} from "../services/noteService";

import { Box } from "@mui/material";

//useLocation is imported from "react-router-dom" to access the current URL location.
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation(); //Takes the url

  const [showTakeNote1, setShowTakeNote1] = useState(true);

  //Initialize view type
  const [viewType, setViewType] = useState("grid"); //Initialize view type

  //state to control deleted notes
  const [showArchived, setShowArchived] = useState(false);

  const [notes, setNotes] = useState([]);
  const [data, setData] = useState([]);

  //state to control deleted notes
  const [showDeleted, setShowDeleted] = useState(false);

  //state to display current notes
  const [currentNotes, setCurrentNotes] = useState([]);
  //Change
  //State for filtered note
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchText, setSearchText] = useState(""); // Define searchText state

  const toggleViewType = () => {
    setViewType((prevType) => (prevType === "grid" ? "list" : "grid"));
  };

  const handleTakeNoteClick = () => {
    setShowTakeNote1(false); //toggle
    setNotes([...notes, { title: "", description: "" }]);
  };
  const getNotes = async () => {
    let response = await fetchNotes();
    let array1 = response.data.data.data;

    if (showDeleted) {
      setCurrentNotes(array1.filter((item) => item.isDeleted === true));
    } else if (showArchived) {
      setCurrentNotes(array1.filter((item) => item.isArchived === true));
    } else {
      setCurrentNotes(
        array1.filter((item) => !item.isArchived && !item.isDeleted)
      );
    }
  };

  useEffect(() => {
    getNotes();
  }, [showArchived, showDeleted]);

  //These lines manage the state of a variable open using useState and define a function
  //handleToggle to toggle its value.
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  const updateDashboardWithNewNote = (newNote) => {
    //Add the new note to the existing notes data
    setNotes([...notes, newNote]);
  };
  const toggleArchiveNotes = () => {
    setShowArchived(true);
    setShowDeleted(false);
  };

  const toggleDeletedNotes = () => {
    setShowArchived(false);
    setShowDeleted(true);
  };

  const toggleNormal = () => {
    setShowArchived(false);
    setShowDeleted(false);
  };

  // Function to filter notes based on search text
  const filterNotes = (searchText) => {
    const filtered = currentNotes.filter((note) => {
      const title = note.title.toLowerCase();
      const description = note.description.toLowerCase();
      const search = searchText.toLowerCase();
      return title.includes(search) || description.includes(search);
    });
    setFilteredNotes(filtered);
  };

  return (
    <Box>
      <SearchBar
        handleToggle={handleToggle}
        toggleViewType={toggleViewType}
        filterNotes={filterNotes} //Pass the filter notes function
        setSearchText={setSearchText} //Pass setSearchText function
      />
      <MiniDrawer2
        open={open}
        onArchiveClick={toggleArchiveNotes}
        onDeleteClick={toggleDeletedNotes}
        onIconClick={toggleNormal}
      />
      <Box
        // styling property if clicked on the menu bar on the left
        sx={{
          marginLeft: { xs: "65px", md: open ? "280px" : "68px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {showTakeNote1 && <TakeNote1 handleSwitch={handleTakeNoteClick} />}
        {!showTakeNote1 && (
          <TakeNote2
            setShowTakeNote1={setShowTakeNote1}
            updateDashboardWithNewNote={updateDashboardWithNewNote}
            noteData={notes[notes.length - 1]} // Pass the last note (the one being edited)
          />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: viewType === "grid" ? "row" : "column",
            flexWrap: "wrap",
            alignItems: viewType === "grid" ? "flex-start" : "center",
          }}
        >
          {searchText.length === 0
            ? currentNotes.map((item) => (
                <TakeNote3
                  key={item.id}
                  noteData={item}
                  getNotes={getNotes}
                  viewType={viewType}
                  showDeleted={showDeleted}
                  updateNotes={updateNotes} // Pass the updateNotes function here
                />
              ))
            : filteredNotes.map((item) => (
                <TakeNote3
                  key={item.id}
                  noteData={item}
                  getNotes={getNotes}
                  viewType={viewType}
                  showDeleted={showDeleted}
                  updateNotes={updateNotes}
                />
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
