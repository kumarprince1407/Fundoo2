import * as React from "react";
import Box from "@mui/material/Box";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { changeColor } from "../services/noteService";

// functional component named ColorPalette that receives several props:
// action, noteId, setNotes, and updatecolor
export default function ColorPalette({
  action,
  noteId,
  setNotes,
  updatecolor,
}) {
  // console.log(action)

  //Initializing state variables using the React useState hook
  //These state variables are used to manage the position and visibility of a popper component.
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  //Defining the function handleClick that opens/closes the color palette popper:(READ)
  //This function is called when the color palette icon is clicked.
  //It toggles the visibility of the popper.
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  // Function selectColor that handles color selection.
  //This function is called when a color is clicked in the color palette.
  // It checks the action prop and either sets the color for a new note
  //creation (action === "create") or updates the color of an existing
  //note (action === "edit"). It also closes the popper and logs the response.
  const selectColor = async (color) => {
    if (action === "create") {
      setNotes((prevState) => ({ ...prevState, color: color }));
      setOpen(false);
    } else if (action === "edit") {
      let data = { noteIdList: [noteId], color: color };
      let response = await changeColor(data);
      updatecolor(color);
      setOpen(false);
      console.log(response);
      // setNotes((prevState)=>({...prevState, color:color}))
    }
  };
  const colors = [
    "#2ECC71",
    "#AF7AC5",
    "#ffffff",
    "#F1948A",
    "#A3E4D7",
    "#F5B7B1",
    "#F5B041",
    "#DC7633",
    "#F1C40F",
    "#AAB7B8",
    "#F1948A",
    "#2ECC71",
    "#F5B041",
  ];

  // Defining id for the popper:
  const id = open ? "simple-popper" : undefined;

  return (
    <React.Fragment>
      <Box>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper sx={{ borderRadius: "10px" }}>
                <Typography sx={{ p: 2 }} component={"span"}>
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: "background.paper",
                      display: "flex",
                      alignItems: "center",
                      height: 25,
                    }}
                  >
                    {colors.map((uu, index) => (
                      <div
                        onClick={() => selectColor(uu)}
                        key={index}
                        style={{
                          backgroundColor: uu,
                          height: 25,
                          width: 25,
                          margin: 2,
                          borderRadius: 50,
                        }}
                      ></div>
                    ))}
                  </Box>
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <IconButton size="small" onClick={handleClick("bottom-start")}>
          <ColorLensIcon fontSize="small" />
        </IconButton>
      </Box>
    </React.Fragment>
  );
}
