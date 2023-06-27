import { Box, Button, CssBaseline, IconButton, Stack, styled, Typography } from '@mui/material'
import img from './bgimg.jpg'
import AgricultureIcon from '@mui/icons-material/Agriculture';
import Login from './Login';
import Register from './Register';
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';

const LandingPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    //const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn == true) {
            navigate("/dashboard");
        }
        });
    }, []);
    const [loginOpen, setLoginOpen] = useState(false);
    const [RegisterOpen, setRegisterOpen] = useState(false);

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    const handleRegisterOpen = () => {
        setRegisterOpen(true);
    };

    const handleRegiaterClose = () => {
        setRegisterOpen(false);
    };

    const triggerRegisterOpen = () => {
        if(RegisterOpen === true)
            setRegisterOpen(false);
        else
            setRegisterOpen(true);
    };

    const StyledBox = styled('div')({
        top:'0px', right:'0px', bottom:'0px', left:'0px',
        backgroundImage:`url(${img})`,
        backgroundSize:'cover',
        display:'flex',

    })
  return (
    <Box>
        <CssBaseline/>
        <StyledBox>
            <Box bgcolor={'rgba(165, 214, 167, 0.6)'} sx={{height:'100vh', width:'100%'}}>
                <Box sx={{position:'absolute', top:'0px', right:'0px', bottom:'0px', left:'0px'}}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{paddingLeft:'50px', paddingRight:'100px'}}>
                        <IconButton> 
                            <AgricultureIcon sx={{color:colors.primary[400]}} fontSize='large'/>
                        </IconButton>
                        <Stack direction={'row'} spacing={4} ml={'10px'}>
                            <Button sx={{color:colors.primary[400]}} onClick={handleLoginOpen} variant='outlined' >Login</Button>
                            <Button sx={{color:colors.primary[400]}} onClick={handleRegisterOpen} variant='outlined' >Register</Button>
                        </Stack>
                    </Stack>
                    <Typography color={colors.primary[400]} variant='h2' align='center' paddingTop={'200px'}>Hi, Welcome back</Typography>                    
                </Box>
                <Login open={loginOpen} handleClickOpen={handleLoginOpen} handleClose={handleLoginClose}/>
                <Register open={RegisterOpen} handleClickOpen={handleRegisterOpen} handleClose={handleRegiaterClose} trigger={triggerRegisterOpen}></Register>
            </Box>
        </StyledBox>
    </Box>
  )
}

export default LandingPage