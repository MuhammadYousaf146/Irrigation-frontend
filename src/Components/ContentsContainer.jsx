import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import TemperatureCard from './TemperatureCard'
import HumidityCard from './HumidityCard'
import MoistureCard from './MoistureCard'
import { usestate, useEffect } from 'react'
import axios from 'axios'
import { useTheme } from '@emotion/react'
import { tokens } from '../theme'
import Header from './Header'
import MyCard from './MyCard'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterIcon from '@mui/icons-material/Water';
import OpacityIcon from '@mui/icons-material/Opacity';


const ContentsContainer = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //console.log(props.loaded)
  
  
  return (
    <Box m={'20px'}>
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
            <Grid item xs={4} md={4}>
              <MyCard title="Temperature" subtitle="Gujrat, PK" value={props.data.temperature ? props.data.temperature+'\u00b0'+"C": "0"+'\u00b0'+"C"} icon={<WbSunnyIcon sx={{ color: colors.greenAccent[500], fontSize: "26px" }}/>}/>
              {/* <TemperatureCard value={ props.data ? props.data.temperature : 0}/> */}
            </Grid>
            <Grid item xs={4} md={4}>
            <MyCard title="Humidity" subtitle="Gujrat, PK" value={props.data.humidity ? props.data.humidity+"%" : "0 %"} icon={<OpacityIcon sx={{ color: colors.greenAccent[500], fontSize: "26px" }}/>}/>
            </Grid>
            <Grid item xs={4} md={4}>
              <MyCard title="Moisture" subtitle="Gujrat, PK" value={props.data.mist2 ? props.data.mist2 : 0} icon={<WaterIcon sx={{ color: colors.greenAccent[500], fontSize: "26px" }}/>}/>
            </Grid>
        </Grid>
    </Box>
  )
}

export default ContentsContainer