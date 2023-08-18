import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import Header from './Header'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CameraIcon from '@mui/icons-material/Camera';
import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import Webcam from "react-webcam";
import { tokens } from "../theme";
import { useTheme } from '@emotion/react';
import axios from "axios";



const DeseaseDetector = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [img, setImg] = useState(null);
    const [camImg, setCamImg] = useState(null);
    const [imgName, setImgName] = useState("No selected Image");
    const [isCam, setIsCam] = useState(false);
    const webCamRef = useRef(null)
    const [camEnable, setCamEnable] = useState(true);
    const [message, setMessage] = useState("");
    const capture = useCallback(() => {
        const img = webCamRef.current.getScreenshot();
        setCamImg(img);
      }, [webCamRef]);

    const checkDesease = async () =>{

        // if(img)
        // {
        //     const reader = new FileReader();
        //     reader.onload = function(event){
        //         const imgData = event.target.result;
        //         console.log(imgData)



        //         axios.post("http://localhost:3001/deseaseDetector", {"imgData":imgData}).then((Response)=>{
        //             console.log("hello");
        //         }).catch((err)=>{
        //             console.log(err)
        //         }).finally(()=>{
        //             console.log("done")
        //         })
        //     }
        //     reader.readAsArrayBuffer(img)
        // }

        if (!img) {
            console.log('No file selected.');
            return;
          }
      
          const formData = new FormData();
          formData.append('image', img);

          console.log(formData.get("image"));

            axios.post('http://localhost:3001/upload', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });




        // // Get the image element
        // var img = document.getElementById("base64");
        
        // // Create a canvas element
        // var canvas = document.createElement('canvas');
        // var context = canvas.getContext('2d');
        
        // // Set canvas dimensions to match the image
        // canvas.width = img.naturalWidth;
        // canvas.height = img.naturalHeight;
        
        // // Draw the image onto the canvas
        // context.drawImage(img, 0, 0);
        
        // // Get the Base64 data
        // var base64Data = canvas.toDataURL('image/jpeg'); // Change 'image/jpeg' to match the image type
        
        // const imgData = base64Data;
        // console.log(imgData)
        // //console.log(imgData[1])
        // const formData = new FormData();
        // formData.append('image', img);

        
    }
  return (
    <Box margin={"20px"}>
        <Box>
            <Header title='Desease Detector' subtitle='Something seemed to be wrong, you can diagnose it here '/>
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Box display={'flex'} justifyContent={'space-around'}>
                <Box pr={3}>
                    <Box encType='multipart/form-data' display={'flex'} flexDirection={'column'} component={'form'} onClick={()=>{document.querySelector(".input-file").click()}} 
                        border={'dashed'} borderColor={colors.greenAccent[400]} padding={0} height={"250px"} width={"400px"} 
                        sx={{cursor:isCam ? "not-allowed" : "pointer"}} justifyContent={'center'} alignItems={'center'}>
                        <Box hidden disabled={isCam} className='input-file' bgcolor={'red'} height={'100%'} width={'100%'} sx={{cursor:"pointer"}} component={"input"} type='file' accept='image/*' 
                            onChange={(event)=>{
                                if(event.target.files)
                                {
                                    if(event.target.files[0])
                                    {
                                        setImgName(event.target.files[0].name)
                                    }
                                    setImg(event.target.files[0])

                                    setCamEnable(false)
                                }
                            }} ></Box>

                            {
                                img ?
                                <center><img id='base64' name="image" src={URL.createObjectURL(img)} height={'200'} width={'auto'} alt={imgName}/></center>
                                :
                                <>
                                    <CloudUploadIcon sx={{fontSize:"50px", color:colors.greenAccent[400]}}/>
                                    <Typography color={colors.grey[100]}>Browse Image to upload</Typography>
                                </>
                            }
                    </Box>
                    <Box fontStyle={'oblique'} margin={"10px 0"} bgcolor={colors.grey[900]}  display={'flex'} justifyContent={"space-between"} alignItems={'center'} padding={'16px 20px'} borderRadius={'5px'} color={colors.greenAccent[400]}>
                        {imgName}
                        <DeleteForeverIcon fontSize='large' sx={{cursor:"pointer"}} onClick={()=>{
                            setImgName("No selected Image");
                            setImg(null)
                            setCamEnable(true)
                        }}/>
                    </Box>
                </Box>
                <Box pl={3}>
                    <Box display={'flex'} flexDirection={'column'} component={'form'} onClick={()=>{document.querySelector(".take-photo").click()}} 
                        border={'dashed'} borderColor={colors.greenAccent[400]} padding={0} height={"250px"} width={"400px"} 
                        sx={{cursor:!img ? "pointer" : "not-allowed"}} justifyContent={'center'} alignItems={'center'}>
                        <Box hidden disabled={img} className='take-photo' bgcolor={'red'} height={'100%'} width={'100%'} sx={{cursor:"pointer"}} component={"button"} 
                            onClick={(event)=>{
                                event.preventDefault()
                                setIsCam(true)
                            }} ></Box>

                            {
                                isCam && !camImg && <center><Webcam height={'200'} width={'auto'} ref={webCamRef}/></center>
                            }
                            {
                                !isCam && !camImg && <>
                                    <PhotoCameraIcon sx={{fontSize:"50px", color:colors.greenAccent[400]}}/>
                                    <Typography color={colors.grey[100]}>Take Image to upload</Typography>
                                </>
                            }
                            {
                                camImg && <img src={camImg} height={'200'} width={'auto'} alt='Image001'/>
                            }
                    </Box>
                    <Box fontStyle={'oblique'} bgcolor={colors.grey[900]} margin={"10px 0"} display={'flex'} justifyContent={'space-around'} alignItems={'center'} padding={'15px 20px'} borderRadius={'5px'} color={colors.grey[900]}>
                        <Button disabled={!camEnable} endIcon={<CameraIcon/>} color='secondary' variant='outlined' onClick={()=>{
                            capture();
                        }}>Capture</Button>
                        <Button disabled={!camEnable} endIcon={<ReplayIcon/>} color='secondary' variant='outlined' onClick={()=>{
                            setCamImg(null);
                            setIsCam(false)
                        }}>Reset</Button>
                    </Box>
                </Box>
            </Box>
            <Box margin={1}>
                <Button disabled={!img && !camImg} variant='outlined' color='secondary' size='large' fontSize='large' endIcon={<SendIcon/>} onClick={checkDesease}>Check</Button>
            </Box>
        </Box>
    </Box>
  )
}

export default DeseaseDetector