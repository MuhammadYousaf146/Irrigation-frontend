import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        console.log("Logout...")
          axios.post("http://localhost:3001/logout",{"user" : {}}).then((response)=>{
            navigate("/");
          })
      },[])
  return (
    <Box position={'absolute'} top={"50%"} right={"40%"}>
        <Typography variant='h2'> 
            Logging off...
        </Typography>
    </Box>
  )
}

export default Logout