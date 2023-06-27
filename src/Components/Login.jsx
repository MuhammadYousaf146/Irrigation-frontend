import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

export default function Login(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [isLoginPressed, setIsLoginPressed] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:Yup.object({
            email:Yup
            .string("Enter Your Email")
            .email("Enter a Valid Email")
            .required("Required"),
            password:Yup
            .string("Enter your Password")
            .required("Required")
        }),
        onSubmit: (values)=>{
            //console.log(values)
            setIsLoginPressed(true)
            axios
            .post("http://localhost:3001/login", values)
            .then((response) => setData(response.data))
            .catch((error) => setError(error.message))
            .finally(() => setLoaded(true));
    
            console.log(data)
            console.log(error)
            console.log(loaded)
        }

    })

    useEffect(()=>{
      if(data.code === 200)
      {
        navigate("/dashboard");
      }
    })

    

    

    const handleLogin = (event) => {
        // event.preventDefault();
        // setIsLoginPressed(true)
        // console.log(inputs)
       
    };

    return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle align="center" variant="h4">Please Login</DialogTitle>
        <DialogContent align={'center'}>
          <DialogContentText mb={2}>
            Login here using Username & Password
          </DialogContentText>
          {
            isLoginPressed && loaded && data.code === 401 &&
            <DialogContentText mb={2} color={'red'}>
                Invalid Username or Password
            </DialogContentText>
          }
          
          
            <TextField
                //autoFocus
                error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                color="secondary"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                helperText={(Boolean(formik.touched.email) && Boolean(formik.errors.email)) ? formik.errors.email : null}
            />
            <TextField
                error={Boolean(formik.touched.password) && Boolean(formik.errors.password)}
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type="text"
                color="secondary"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                helperText={(Boolean(formik.touched.password) && Boolean(formik.errors.password)) ? formik.errors.password : null}
            />
            {/* {formik.touched.email && formik.errors.email && <Typography>{formik.errors.email}</Typography>} */}
           
          
            <Button type="submit" variant="contained" onClick={formik.handleSubmit}>
                Login
            </Button>
    
      
        </DialogContent>
        <DialogActions>
            {/* <Button align='center'
                onClick={handleLogin}>
                Login
            </Button> */}
          {/* <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={props.DialogActionshandleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}