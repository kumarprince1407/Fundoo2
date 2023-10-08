// NoteEditorModal.jsx
import React, { useState } from "react";
import {
  Container,
  IconButton,
  InputBase,
  Box,
  FormControlLabel,
} from "@mui/material";
import {
  PushPinOutlined as PushPinOutlinedIcon,
  AddAlertOutlined as AddAlertOutlinedIcon,
  PersonAddAltOutlined as PersonAddAltOutlinedIcon,
  ImageOutlined as ImageOutlinedIcon,
  ArchiveOutlined as ArchiveOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
} from "@mui/icons-material";
import ColorPalette from "./ColourPalette";
import { updateNotes } from "../services/noteService";

const NoteEditorModal = ({
  isOpen,
  onClose,
  initialData,
  updateDashboardWithUpdatedNote,
}) => {
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleUpdate = async () => {
    // Call the updateNotes function to update the note
    const updatedNote = await updateNotes(data);
    // Call a callback to update the dashboard with the updated note
    updateDashboardWithUpdatedNote(updatedNote.data.data);
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="note-editor-modal">
      <Container sx={{ width: "600px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            border: "1px solid gray",
            borderRadius: 2,
            padding: 2,
            width: "580px",
            backgroundColor: data.color ? data.color : "",
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
              value={data.title}
              onChange={handleChange}
              InputProps={{
                style: {
                  border: "none",
                },
              }}
            />
            <IconButton onClick={onClose}>
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
              value={data.description}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: {
                  border: "none",
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
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
              noteId={data.id}
              updatecolor={updateDashboardWithUpdatedNote}
            />
            <IconButton onClick={handleUpdate}>
              <ArchiveOutlinedIcon />
            </IconButton>
            <IconButton onClick={onClose}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            <IconButton></IconButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default NoteEditorModal;
