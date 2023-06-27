import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(props) {

    const [isRegisterPressed, setIsRegisterPressed] = useState(false);

    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [value, setValue] = useState();
    const phoneRegExp = "^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$";
    const cnicRegExp = "^[0-9]{5}-[0-9]{7}-[0-9]$";
    const navigate = useNavigate();

    //const passwordRegExp = "^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$";


    const formik = useFormik({
        initialValues:{
            fullname:"",
            email:"",
            cnic:"",
            phoneno:"",
            password:"",
            confirmPassword:""
        },
        validationSchema:Yup.object({
            fullname:Yup.string("Enter your Full Name")
            .max(30,"Must be less than 30 characters")
            .required("Required"),
            email:Yup.string("Enter your Email Address")
            .email("Enter a Valid Email Address")
            .required("Required"),
            cnic:Yup.string()
            .required("Required")
            .matches(cnicRegExp, "CNIC No must follow the XXXXX-XXXXXXX-X format!"),
            phoneno:Yup.string()
            .required("Required")
            .matches(phoneRegExp, 'Phone number is not valid'),
            password: Yup
            .string()
            .required('Please Enter your password')
            .min("8"),
            
          confirmPassword: Yup
            .string()
            .required("Required")
            .oneOf([Yup.ref("password"), null], "Passwords must match")
        }),
        onSubmit:(values)=>{
            console.log(values)
            setIsRegisterPressed(true)
            axios
            .post("http://localhost:3001/register", values)
            .then((response) => setData(response.data))
            .catch((error) => setError(error.message))
            .finally(() => setLoaded(true));

            console.log(data.code)
            console.log(error)
            console.log(loaded)
        }
    })
    useEffect(()=>{
      if(data.code === 200)
      {
        
      }
    })


    const handleChange = (event) => {
      //const value = event.target.value;
      //setValue(value);
      console.log(event);
    }

    const handleLogin = (event) => {
        // event.preventDefault();
        //setIsLoginPressed(true)
        // console.log(inputs)
        // axios
        // .post("http://localhost:3001/register", inputs)
        // .then((response) => setData(response.data))
        // .catch((error) => setError(error.message))
        // .finally(() => setLoaded(true));

        // console.log(data)
        // console.log(error)
        // console.log(loaded)
    };

    return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} maxWidth='sm' align={'center'}>
        <DialogTitle align="center" variant="h4">Create an Account</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            Register Here
          </DialogContentText>
          {
            isRegisterPressed && loaded && data.code === 409 &&
            <DialogContentText mb={2} color={'red'}>
                Email already registered!
            </DialogContentText>
          }
          {
            isRegisterPressed && loaded && data.code === 200 &&
            <DialogContentText mb={2} color={'green'}>
                Registered Successfully
            </DialogContentText>
          }
          
          <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
            <Grid item xs={4} md={6}>
                <TextField
                    error={Boolean(formik.touched.fullname) && Boolean(formik.errors.fullname)}
                    margin="dense"
                    id="fullname"
                    name="fullname"
                    label="Full Name"
                    type="text"
                    color="secondary"
                    fullWidth
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    helperText={(Boolean(formik.touched.fullname) && Boolean(formik.errors.fullname)) ? formik.errors.fullname : null}
                />
            </Grid>
            <Grid item xs={4} md={6}>
            <TextField
                    error={Boolean(formik.touched.phoneno) && Boolean(formik.errors.phoneno)}
                    margin="dense"
                    id="phoneno"
                    name="phoneno"
                    label="Phone Number"
                    type="text"
                    color="secondary"
                    fullWidth
                    value={formik.values.phoneno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    helperText={(Boolean(formik.touched.phoneno) && Boolean(formik.errors.phoneno)) ? formik.errors.phoneno : null}
                />
            </Grid>
           <Grid item xs={4} md={6}>
                <TextField
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
           </Grid>
            <Grid item xs={4} md={6}>
                <TextField
                    error={Boolean(formik.touched.cnic) && Boolean(formik.errors.cnic)}
                    margin="dense"
                    id="cnic"
                    name="cnic"
                    label="CNIC"
                    type="text"
                    color="secondary"
                    fullWidth
                    value={formik.values.cnic}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    helperText={(Boolean(formik.touched.cnic) && Boolean(formik.errors.cnic)) ? formik.errors.cnic : null}
                />
                
            {/* <TextField
                    error={Boolean(formik.touched.phoneno) && Boolean(formik.errors.phoneno)}
                    margin="dense"
                    id="phoneno"
                    name="phoneno"
                    label="Phone Number"
                    type="text"
                    fullWidth
                    value={formik.values.phoneno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    helperText={(Boolean(formik.touched.phoneno) && Boolean(formik.errors.phoneno)) ? formik.errors.phoneno : null}
                /> */}
            </Grid>
            <Grid item xs={4} md={6}>
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
           </Grid>
           <Grid item xs={4} md={6}>
                <TextField
                    error={Boolean(formik.touched.confirmPassword) && Boolean(formik.errors.pasconfirmPasswordsword)}
                    margin="dense"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    color="secondary"
                    fullWidth
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    helperText={(Boolean(formik.touched.confirmPassword) && Boolean(formik.errors.confirmPassword)) ? formik.errors.confirmPassword : null}
                />
           </Grid>
            <Grid item xs={12}>
                <Button variant="contained" size="large" onClick={formik.handleSubmit}>
                    Register
                </Button>
            </Grid>
          </Grid>
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