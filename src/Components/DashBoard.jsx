import React from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'
import ContentsContainer from './ContentsContainer'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from "axios";
import { UserContext } from './UserContext'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Logout from './Logout'
import LineChart from './LineChart'
import DeseaseDetector from './DeseaseDetector'

const DashBoard = () => {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [fields, setFields] = useState({});
  const [field, setField] = useState("");
  const [data, setData] = useState({}); //temperature humidity moisture => Cards
  const [refresh, setRefresh] = useState(false);
  const [humidityChartDataByDays, setHumidityChartDataByDays] = useState([]);
  const [temperatureChartDataByDays, setTemperatureChartDataByDays] = useState([]);
  const [moistureChartDataByDays, setMoistureChartDataByDays] = useState([]);
  const [humidityChartDataByHours, setHumidityChartDataByHours] = useState([]);
  const [temperatureChartDataByHours, setTemperatureChartDataByHours] = useState([]);
  const [moistureChartDataByHours, setMoistureChartDataByHours] = useState([]);
  const [graphBy, setGraphBy] = useState("Hours");

  const navigate = useNavigate();

  const toggleRefresh = () => {
    setRefresh((refresh)=>{
      return !refresh;
    })
  }

  const handleChange = (event) => {
    setField(event.target.value);
  };

  const handleGraphChange = (e) => {
    setGraphBy(e.target.value);
  }

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setUser(response.data.user[0]);
        setLoggedIn(true);
      }
      else{
        setLoggedIn(false);
        navigate("/");
      }
    });
  },[]);

  useEffect(()=>{
    if(field)
    {
      axios.post("http://localhost:3001/field", {"field":field})
        .then((response) => {
          setData(response.data[0]); //chards data
          //console.log(data[0])
        }).finally(()=>{
          //setLoaded(true);
        });
    }
  },[field,refresh])

  useEffect(()=>{
    if(loggedIn)
    {
      //console.log("Requesting Data....")
      axios.post("http://localhost:3001/dashboardData", user)
        .then((response) => {
          //console.log(response.data[0].boardID)
          setFields(response.data);
          setField(response.data[0].boardID)
        });
    }
  },[loggedIn])

  useEffect(()=>{
    
    if(field){
      setHumidityChartDataByDays([])
      setMoistureChartDataByDays([])
      setTemperatureChartDataByDays([])
      setHumidityChartDataByHours([])
      setMoistureChartDataByHours([])
      setTemperatureChartDataByHours([])
      async function setGraphDataByDays() {
        const result = await axios.post("http://localhost:3001/last10daysrecord",{"field":field})
        //console.log(result.data)
        result.data.forEach((data)=>{
          var date = "" + data.day + "-" + data.month + "-" + data.year
          setTemperatureChartDataByDays((value)=>{
            return([{"x":date,"y":data.temp_average}, ...value])
          })
          setHumidityChartDataByDays((value)=>{
            return([{"x":date,"y":data.humidity_average}, ...value])
          })
          setMoistureChartDataByDays((value)=>{
            return([{"x":date,"y":data.mist_average}, ...value])
          })
        })
      }
      setGraphDataByDays()

      async function setGraphDataByHours() {
        const result = await axios.post("http://localhost:3001/last10hoursrecord",{"field":field})
        //onsole.log(result.data)
        result.data.forEach((data)=>{
          var date = "(" + data.day + "-" + data.month + ") : " + data.hour
          setTemperatureChartDataByHours((value)=>{
            return([{"x":date,"y":data.temp_average}, ...value])
          })
          setHumidityChartDataByHours((value)=>{
            return([{"x":date,"y":data.humidity_average}, ...value])
          })
          setMoistureChartDataByHours((value)=>{
            return([{"x":date,"y":data.mist_average}, ...value])
          })
        })
      }
      setGraphDataByHours()
    }
  },[field])

  return (
    <UserContext.Provider value={user}>
      <Box display={'flex'} position={'relative'} height={"100%"} width={'100%'}>
        <SideBar/>
        <Box flexGrow={1} height={"100%"} width={'100%'}>
          <TopBar fields={fields} field={field} handleChange={handleChange} setField={setField}/>
          <Routes>
                <Route path="/" element={<ContentsContainer data={data} field={field} refresh={refresh} toggleRefresh={toggleRefresh}/>} />
                <Route path="/logout" element={<Logout/>}/>
                <Route path='/temperature' element={<LineChart graphBy={graphBy} handleGraphChange={handleGraphChange} title="Temperature" subtitle="Analyzing the temperature." data={graphBy==="Days"? temperatureChartDataByDays : temperatureChartDataByHours}/>}/>
                <Route path='/humidity' element={<LineChart graphBy={graphBy} handleGraphChange={handleGraphChange} title="Humidity" subtitle="Analyzing the Humidity." data={graphBy==="Days"? humidityChartDataByDays : humidityChartDataByHours}/>}/>
                <Route path='/moisture' element={<LineChart graphBy={graphBy} handleGraphChange={handleGraphChange} title="Moisture" subtitle="Analyzing the Moisture." data={graphBy==="Days"? moistureChartDataByDays : moistureChartDataByHours}/>}/>
                <Route path='/ai' element={<DeseaseDetector />} />

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