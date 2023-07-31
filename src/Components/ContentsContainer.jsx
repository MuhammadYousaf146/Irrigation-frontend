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
import Wave from 'react-wavify';
import moment from 'moment';



const ContentsContainer = (props) => {
  axios.defaults.withCredentials = true;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isAutoChecked, setIsAutoChecked] = useState(false)
  const [isMotor1, setIsMotor1] = useState(false)
  const [isMotor2, setIsMotor2] = useState(false)
  const [isRecordLoaded, setIsRecordLoaded] = useState(false)
  const [datetime, setDatetime] = useState("")
  const handleAuto = (event) => {
    setIsAutoChecked(event.target.checked);
  };
  const onMotor1Change = (event) => {
    setIsMotor1(event.target.checked);
  };
  const onMotor2Change = (event) => {
    setIsMotor2(event.target.checked);
  };
  const getDate = (epoch) => {
    var date = new Date(0);
    date.setUTCSeconds(epoch)
    const dateTimeAgo = moment(date).fromNow();
    //d.setUTCMilliseconds(Math.abs(curD-date))
    //console.log(date)
    return dateTimeAgo;
  }
  useEffect(()=>{
    if(props.field)
      {axios.post("http://localhost:3001/getAutoMotor",{field:props.field}).then((response)=>{
        if(response.data[0].automanual==0)
          setIsAutoChecked(false)
        else
          setIsAutoChecked(true)

        if(response.data[0].m1==0)
          setIsMotor1(false)
        else
          setIsMotor1(true)

        if(response.data[0].m2==0)
          setIsMotor2(false)
        else
          setIsMotor2(true)
        //console.log(response.data[0])
        
      }).finally(()=>{
        setIsRecordLoaded(true)
        //console.log({"auto":isAutoChecked,"m1":isMotor1,"m2":isMotor2})
      })}
  },[props.field])

  useEffect(()=>{
    if(props.data.date)
    setDatetime(getDate(props.data.date))
    //console.log(datetime)
  },[props.data.date])

  useEffect(()=>{
    if(props.field && isRecordLoaded)
      {axios.post("http://localhost:3001/setAutomanual",{"automanual":isAutoChecked, "field":props.field}).then((response)=>{
        
        //console.log(response)
      })}
  },[isAutoChecked])

  useEffect(()=>{
    if(props.field && isRecordLoaded)
      {axios.post("http://localhost:3001/setMotor1",{"motor1":isMotor1, "field":props.field}).then((response)=>{
        
        //console.log(response)
      })}
  },[isMotor1])

  useEffect(()=>{
    if(props.field && isRecordLoaded)
      {axios.post("http://localhost:3001/setMotor2",{"motor2":isMotor2, "field":props.field}).then((response)=>{
        
        //console.log(response)
      })}
  },[isMotor2])
  //console.log(props.data)
  
  

  
  
  return (
    <Box m={'20px'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
        <Typography>{datetime}</Typography>
      </Box>
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
            <Grid item xs={4} md={4}>
            <Wave fill='#2389da'
                  paused={false}
                  options={{
                    height:(props.data.waterLevel/1023)*100,
                    amplitude: 10,
                    speed: 0.18,
                    points: 4
                  }}
            />
            <Box color={colors.greenAccent[500]}>Water Level: {100-Math.floor((props.data.waterLevel/1023)*100)}%</Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <MyCard title="Auto/Manual" subtitle="Control the water flow" checked={isAutoChecked} onChange={handleAuto} isAuto={true} value={props.data.mist2 ? props.data.mist2 : 0} icon={<WaterIcon sx={{ color: colors.greenAccent[500], fontSize: "26px" }}/>}/>
            </Grid>
            <Grid item xs={4} md={4}>
              <MyCard title="Water Pumps" subtitle="Watering your Fields" water={true} motor1={isMotor1} motor2={isMotor2} onMotor1Change={onMotor1Change} onMotor2Change={onMotor2Change} value={props.data.mist2 ? props.data.mist2 : 0} icon={<WaterIcon sx={{ color: colors.greenAccent[500], fontSize: "26px" }}/>}/>
            </Grid>
        </Grid>
    </Box>
  )
}

export default ContentsContainer