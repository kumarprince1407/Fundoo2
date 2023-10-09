//TakeNote3.jsx
import React, { useState, useEffect } from "react";
import ColorPalette from "./ColourPalette";
import DeleteNote from "./DeleteNote";
import EditNote3 from "./EditNote3";

import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import {
  FormControlLabel,
  IconButton,
  Box,
  InputBase,
  Button,
} from "@mui/material";

import {
  archiveItem,
  deleteItem,
  deleteForever,
  updateNotes,
} from "../services/noteService";

const TakeNote3 = ({
  noteData,
  getNotes,
  viewType,
  showDeleted,
  updateNotes,
}) => {
  //Change
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: noteData.title,
    description: noteData.description,
  });

  const handleEditClick = async () => {
    let data = {
      noteId: noteData.id,
      title: editedNote.title,
      description: editedNote.description,
    };

    try {
      const response = await updateNotes(data);
      if (response.status === 200) {
        getNotes();
        setIsEditing(false);
      } else {
        console.log("Error updating note:", response.statusText);
      }
    } catch (error) {
      console.log("Error updating note:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const archiveTextItem = async () => {
    // the async keyword indicates that the function will contain asynchronous operations
    const data = { noteIdList: [noteData.id], isArchived: true };
    //Inside the func, a constant variable data is defined.It is an object that contains two properties
    //noteIdList: An array that holds the 'id' of the note to be archived
    //The noteData.id is the id of the current note, which is obtained from
    //noteData prop
    //'isArchived': A boolean property set to true. It indicates that the note should be archived.
    //'await archiveItem(data)' : This line uses the 'await' keyword to call the 'archiveItem' function.
    //with the 'data' object as argument. The 'archiveItem' function sends an HTTP POST request to
    // an endpoint to archive the note
    await archiveItem(data);
    getNotes();
    //Calling the getNotes function defined in Dashboard
  };

  const unarchiveTextItem = async () => {
    const data = { noteIdList: [noteData.id], isArchived: false };
    await archiveItem(data);
    getNotes();
  };

  //delete
  const deleteTextItem = async () => {
    const data = { noteIdList: [noteData.id], isDeleted: true };
    await deleteItem(data);
    getNotes();
  };

  const deleteForeverItem = async () => {
    const data = { noteIdList: [noteData.id] };
    await deleteForever(data);
    getNotes();
  };

  const restoreFromTrashItem = async () => {
    const data = { noteIdList: [noteData.id], isDeleted: false };
    await updateNotes(data);
    setIsDeleted(false); //Update the local state
    getNotes();
  };
  // Determine whether the note is deleted, and set the 'isDeleted' state accordingly
  const [isDeleted, setIsDeleted] = useState(false);
  const [isArchived, setIsArchived] = useState(true);

  useEffect(() => {
    setIsDeleted(noteData.isDeleted === true);
  }, [noteData.isDeleted]);

  useEffect(() => {
    setIsArchived(noteData.isArchived === false);
  }, [noteData.isArchived]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px solid gray",
        borderRadius: 2,
        padding: 2,
        width: viewType === "grid" ? "280px" : "580px",
        marginLeft: viewType === "grid" ? "20px" : "44px",
        marginRight: "20px",

        marginTop: "10px",
        //The card's background color is determined by the noteData.color value if it exists
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
          id="title"
          placeholder="Title"
          variant="outlined"
          fullWidth
          //change
          value={noteData.title}
          // onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            style: {
              //Remove the outline
              border: "none",
            },
          }}
        />
        <IconButton>
          <FormControlLabel control={<PushPinOutlinedIcon />} />
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
          id="description"
          placeholder="..."
          variant="outlined"
          value={noteData.description}
          // onChange={(e) => setDescription(e.target.value)}
          fullWidth
          InputProps={{
            style: {
              //Remove the outline
              border: "none",
            },
          }}
        />
      </Box>
      <Box
        className="box3"
        // className for box
        sx={{ display: "flex", alignItems: "center" }}
      >
        {isDeleted && isArchived ? (
          <>
            <IconButton>
              <RestoreFromTrashIcon onClick={restoreFromTrashItem} />
            </IconButton>
            <IconButton>
              <DeleteForeverIcon onClick={deleteForeverItem} />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton>
              <AddAlertOutlinedIcon />
            </IconButton>
            <IconButton>
              <PersonAddAltOutlinedIcon />
            </IconButton>
            <IconButton>
              <ImageOutlinedIcon />
            </IconButton>
            <ColorPalette
              fontSize="12px"
              action={"edit"}
              noteId={noteData.id}
              updatecolor={getNotes}
            />
            {!noteData.isArchived ? (
              <IconButton onClick={archiveTextItem}>
                <ArchiveOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton onClick={unarchiveTextItem}>
                <UnarchiveOutlinedIcon />
              </IconButton>
            )}

            <IconButton onClick={deleteTextItem}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>

            <IconButton></IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TakeNote3;
