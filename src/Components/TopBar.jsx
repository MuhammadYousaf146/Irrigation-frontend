import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {ColorModeContext} from "../theme";
//import tokens from "../theme";

const Topbar = (props) => {
  const theme = useTheme();
  //const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box width={'20%'}>
        <FormControl fullWidth color='secondary'>
          <InputLabel>Field</InputLabel>
          <Select
            value={props.field}
            label="Field"
            onChange={(event)=>{
              props.handleChange(event);
            }}
          >

            {//map function for objects in js
              Object.keys(props.fields).map(function(key, value) {
                return(
                  <MenuItem key={key} value={props.fields[key].boardID}>{props.fields[key].boardID}</MenuItem>
                );
              })
            }
          </Select>
        </FormControl>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
