//TakeNote1.jsx
import react, { useState } from "react";
import Paper from "@mui/material/Paper";

import {
  Container,
  Checkbox,
  Box,
  InputBase,
  IconButton,
  FormControlLabel,
} from "@mui/material";

import { BrushOutlined } from "@mui/icons-material";
import ImageOutlined from "@mui/icons-material/ImageOutlined";

//TakeNote1 component
const TakeNote1 = ({ handleSwitch }) => {
  //handle the state of the checkbox
  const [checked, setChecked] = useState(true);

  return (
    <Container sx={{ maxWidth: "lg", width: "100%", marginBottom: "10px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          maxWidth: "lg",
          width: "100%",
          marginLeft: "10px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "580px",
            borderRadius: "4px",
            padding: "8px",
          }}
        >
          <InputBase
            onClick={() => handleSwitch(2)}
            id="outlined-basic"
            placeholder="Take a note..."
            variant="outlined"
            sx={{ flex: 1 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
          />
          <IconButton>
            <BrushOutlined />
          </IconButton>

          <IconButton>
            <ImageOutlined />
          </IconButton>
        </Paper>
      </Box>
    </Container>
  );
};
export default TakeNote1;
