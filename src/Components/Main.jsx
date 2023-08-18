import { Routes, Route } from "react-router-dom";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import { Box } from "@mui/material";

function App() {

  return (
    <Box>
        <Sidebar/>
        <Box>
            <Topbar/>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              
            </Routes>
        </Box>
    </Box>
  );
}

export default App;
