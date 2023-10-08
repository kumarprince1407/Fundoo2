import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined"; // Added done icon
import { updateNotes } from "../services/noteService";
import TakeNote3 from "./TakeNote3";

const EditNote3 = ({ noteData, onSave, getNotes, handleInputChange }) => {
  const [editedNoteData, setEditedNoteData] = useState({
    title: noteData.title,
    description: noteData.description,
  });

  const handleSaveClick = async () => {
    const updatedData = {
      id: noteData.id,
      title: noteData.title,
      description: editedNoteData.description,
    };
    //Performing the save operation here with updatedData
    //using the updateNotes function from noteService.jsx
    await updateNotes(updatedData);

    //calling the onsave callback to exit edit note after saving
    onSave();
    getNotes();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px solid gray",
        borderRadius: 2,
        padding: 2,
        width: "580px",
        marginLeft: "44px",
        marginRight: "20px",
        marginTop: "10px",
        backgroundColor: noteData.color ? noteData.color : "",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <InputBase
          name="title"
          placeholder="Title"
          variant="outlined"
          fullWidth
          value={editedNoteData.title}
          onChange={handleInputChange}
          InputProps={{
            style: {
              border: "none",
            },
          }}
        />
        <IconButton onClick={handleSaveClick}>
          <DoneOutlinedIcon /> {/* Save button */}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <InputBase
          name="description"
          placeholder="..."
          variant="outlined"
          value={editedNoteData.description}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            style: {
              border: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default EditNote3;
