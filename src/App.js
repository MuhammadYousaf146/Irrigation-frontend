import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";


import { Box, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import ContentsContainer from './Components/ContentsContainer';
import LandingPage from './Components/LandingPage';
import DashBoard from "./Components/DashBoard";
import WebcamCapture from "./Components/TemperatureCard";


function App() {
  const [theme, colorMode] = useMode();
  
  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {/* <DeseaseDetector/> */}
        <Routes>
          <Route path="/" Component={LandingPage}/>
          <Route path="/dashboard/*" Component={DashBoard}/>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
    
    //<LandingPage/>
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline/>
    //     <Box>
    //       <LandingPage/>
    //       {/* <NavBar/>
    //       <Stack direction={'row' } spacing={2} justifyContent={'space-between'}>
    //         <SideBar/>
    //         <ContentsContainer/>
    //       </Stack> */}
    //     </Box>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
    //<LandingPage/>
    // <Box>
    //   <CssBaseline/>
    //   <NavBar/>
    //   <Stack direction={'row' } spacing={2} justifyContent={'space-between'}>
    //     <SideBar/>
    //     <ContentsContainer/>
    //   </Stack>
    // </Box>
  );
}

export default App;
