import React from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'
import ContentsContainer from './ContentsContainer'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { useEffect, createContext, useState } from 'react'
import axios from "axios";
import { UserContext } from './UserContext'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Logout from './Logout'
import LineChart from './LineChart'

const DashBoard = () => {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [fields, setFields] = useState({});
  const [field, setField] = useState("");
  const [data, setData] = useState({}); //temperature humidity moisture => Cards
  const [loaded, setLoaded] = useState(false);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [temperatureChartData, setTemperatureChartData] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setField(event.target.value);
  };

  useEffect(()=>{
    if(field)
    {
      axios.post("http://localhost:3001/field", {"field":field})
        .then((response) => {
          setData(response.data[0]);
          //console.log(data[0])
        }).finally(()=>{
          setLoaded(true);
        });
    }
  },[field])

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setUser(response.data.user[0]);
        setLoggedIn(true);
      }
      else{
        setLoggedIn(false);
        navigate("/");
      }
    });
  }, []);

  useEffect(()=>{
    if(loggedIn)
    {
      console.log("Requesting Data....")
      axios.post("http://localhost:3001/dashboardData", user)
        .then((response) => {
          setFields(response.data);
        });
    }
  },[loggedIn])

  useEffect(()=>{
    if(field)
    {
      setTemperatureChartData([]);
      axios.post("http://localhost:3001/timeSeriesData",{"field":field}).then((response)=>{
        setTimeSeriesData(response.data);
        timeSeriesData.forEach((data)=>{
          setTemperatureChartData((value)=>{
            return ([{"x":data.datetime, "y":data.temperature}, ...value])
          })
        })
      })
    }
    console.log(temperatureChartData);
  },[field])

  return (
    <UserContext.Provider value={user}>
      <Box display={'flex'} position={'relative'} height={"100%"} width={'100%'}>
        <SideBar/>
        <Box height={"100%"} width={'100%'}>
          <TopBar fields={fields} field={field} handleChange={handleChange} setField={setField}/>
          <Routes>
                <Route path="/" element={<ContentsContainer data={data} />} />
                <Route path="/logout" element={<Logout/>}/>
                <Route path='/temperature' element={<LineChart title="Temperature" subtitle="Analyzing the temperature." data={temperatureChartData}/>}/>
                <Route path='/humidity' element={<LineChart title="Humidity" subtitle="Analyzing the Humidity." data={temperatureChartData}/>}/>
                <Route path='/moisture' element={<LineChart title="Moisture" subtitle="Analyzing the Moisture." data={temperatureChartData}/>}/>

                {/* <Route path="dashboard/temperature" element={<ContentsContainer />} />
                <Route path="/" element={<ContentsContainer />} />
                <Route path="/" element={<ContentsContainer />} /> */}
          </Routes>
        </Box>
      </Box>
    </UserContext.Provider>
  )
}

export default DashBoard