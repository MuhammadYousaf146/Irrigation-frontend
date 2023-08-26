import { Box, Button, Dialog, Backdrop, CircularProgress, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import Header from './Header'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CameraIcon from '@mui/icons-material/Camera';
import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import { tokens } from "../theme";
import { useTheme } from '@emotion/react';
import axios from "axios";



const DiseaseDetector = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [img, setImg] = useState(null);
    const [camImg, setCamImg] = useState(null);
    const [imgName, setImgName] = useState("No selected Image");
    const [isCam, setIsCam] = useState(false);
    const [camEnable, setCamEnable] = useState(true);
    const [message, setMessage] = useState("Healthy");
    const [key, setKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dialOpen, setDialOpen] = useState(false);
    const [code, setCode] = useState(0);

    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const handleStartCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            videoRef.current.srcObject = stream;
          } catch (error) {
            console.error("Error accessing webcam:", error);
          }
    };

    const handleCapture = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/jpeg"); // or "image/png" for PNG format
        setCamImg(dataURL);

        // Close the webcam stream
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            tracks.forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const checkDesease = async () =>{    
        setLoading(true)  
        //console.log(img)

        axios.post('http://localhost:3001/upload', {"image":img? img.split(",")[1] : camImg.split(",")[1]})
        .then(response => {
            console.log(response.data);
            setMessage(response.data.message)
            setDialOpen(true)
            setCode(response.data.code)
        })
        .catch(error => {
            console.error(error);
        }).finally(()=>{
            setLoading(false)
        });
    }

    const powderyMildew = () => {
        return (
            <Box>
                <Typography >What Is Powdery Mildew?</Typography>
                <Typography>Powdery mildew is a common fungal disease that affects a wide variety of plants, including crops, ornamental plants, and trees. The disease gets its name from the powdery, white or grayish growth that appears on the surfaces of leaves, stems, flowers, and fruit.</Typography>
                <Typography >How to Prevent Powdery Mildew?</Typography>
                <Typography>
                    <ol>
                        <li>
                            Humidity 
                            <ul>
                                <li>
                                    Control the humidity by avoiding overcrowding plants
                                </li>
                            </ul>
                        </li>
                        <li>
                            Water Management
                            <ul>
                                <li>
                                    Water plants at the base, avoiding overhead irrigation. Wet foliage can encourage fungal growth.
                                </li>
                                <li>
                                    Water early in the day to allow foliage to dry before evening.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Avoid Fertilization
                            <ul>
                                <li>
                                    Avoid excessive nitrogen fertilization, as it can lead to lush, succulent growth that's more susceptible to powdery mildew.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Fungicides
                            <ul>
                                <li>
                                    Choose fungicides labeled for powdery mildew control on the wheat. Always follow the instructions on the label.
                                </li>
                            </ul>
                        </li>
                    </ol>
                </Typography>
            </Box>
        )
    }

    const scab = () =>{
        return(
            <Box>
                <Typography >What is scab?</Typography>
                <Typography>known as Fusarium head blight (FHB) or wheat scab, is a fungal disease caused primarily by the Fusarium graminearum fungus. It affects the flowering parts of wheat, including the spikelets and kernels. This disease can lead to significant yield losses.</Typography>
                <Typography >How to Prevent Scab</Typography>
                <ol>
                    <li>
                        Crop Rotation
                        <ul>
                            <li>
                                Avoid planting wheat in the same field consecutively. Rotate with non-host crops to break the disease cycle.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Early Planting
                        <ul>
                            <li>
                                Plant wheat early, which can help it reach the flowering stage before conditions become optimal for scab development.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Fungicides
                        <ul>
                            <li>
                                Apply fungicides during the critical flowering period when weather conditions are conducive to disease. Follow recommended guidelines and consider local factors.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Moderate Nitrogen
                        <ul>
                            <li>
                                While nitrogen is essential for wheat growth, excessive nitrogen can create lush, dense canopies that are more susceptible to scab. Apply fertilizers based on soil tests and recommendations
                            </li>
                        </ul>
                    </li>
                </ol>
            </Box>
        )
    }
    const stripe = () =>{
        return(
            <Box>
                <Typography >What is Stripe Rust?</Typography>
                <Typography>Stripe rust, also known as yellow rust, gets its name from the characteristic yellowish-orange stripes of fungal spores that appear on the leaves of infected plants.</Typography>
                <Typography >How to prevent Stripe Rust?</Typography>
                <ol>
                    <li>
                        Fungicide Applications
                        <ul>
                            <li>
                                Fungicides should be applied preventively, before the disease becomes established. Consult with local agricultural extension services for recommendations on the best fungicides and application timing for your region.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Monitor Weather Conditions
                        <ul>
                            <li>
                                Be aware of weather conditions that are conducive to stripe rust development, such as cool temperatures and high humidity. Timely application of fungicides may be necessary during periods when these conditions prevail.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Sanitation
                        <ul>
                            <li>
                                Clean your equipment, including machinery and tools, to avoid spreading the fungus between fields. Remove and destroy volunteer wheat plants that can serve as hosts for the fungus.
                            </li>
                        </ul>
                    </li>
                </ol>
            </Box>
        )
    }
    const healthy = () =>{
        return(
            <Box>
                <Typography>Based on our analysis, we are delighted to share that your crops appear to be in good health. The signs are positive, and there is no immediate cause for worry. Keep up the great work you've been doing in maintaining them!</Typography>
                <Typography >We recommend the following</Typography>
                <ol>
                    <li>
                        Regular Inspection
                        <ul>
                            <li>
                                Keep monitoring your crops periodically for any changes in growth patterns, color, or overall appearance.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Proper Watering
                        <ul>
                            <li>
                                Ensure your crops are receiving the right amount of water based on their specific needs. Over-watering or under-watering can sometimes lead to issues.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Nutrient Management
                        <ul>
                            <li>
                                If applicable, maintain a balanced nutrient regimen as advised for your crop type.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Pest and Disease Control
                        <ul>
                            <li>Stay vigilant for any signs of pests or diseases. Early detection can prevent potential problems from escalating.</li>
                        </ul>
                    </li>
                </ol>
            </Box>
        )
    }
    const invalidData = () => {
        return(
            <Box>
                <Typography>Based on our assessment, it appears that the uploaded image may not correspond to a wheat crop. As such, we are unable to provide a specific evaluation of the crop's health.

If you intended to submit a picture of wheat crops, please ensure that the image is clear and representative of the plants in question.</Typography>
            </Box>
        )
    }

  return (
    <Box margin={"20px"}>
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress/>
        </Backdrop>
        <Dialog open={dialOpen}> 
            <DialogTitle align='center' variant='h3'>{message}</DialogTitle>
            <DialogContent>
                {code === 100 && powderyMildew()}
                {code === 101 && scab()}
                {code === 102 && healthy()}
                {code === 103 && invalidData()}
                {code === 104 && stripe()}
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{setDialOpen(false)}} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        
        <Box>
            <Header title='Disease Detector' subtitle='Something seemed to be wrong, you can diagnose it here '/>
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Box display={'flex'} justifyContent={'space-around'}>
                <Box pr={3}>
                    <Box encType='multipart/form-data' display={'flex'} flexDirection={'column'} component={'form'} onClick={()=>{document.querySelector(".input-file").click()}} 
                        border={'dashed'} borderColor={colors.greenAccent[400]} padding={0} height={"250px"} width={"400px"} 
                        sx={{cursor:isCam ? "not-allowed" : "pointer"}} justifyContent={'center'} alignItems={'center'}>
                        <Box hidden disabled={isCam} className='input-file' bgcolor={'red'} height={'100%'} width={'100%'} sx={{cursor:"pointer"}} component={"input"} key={key} type='file' accept='image/*' 
                            onChange={(event)=>{
                                if(event.target.files)
                                {
                                    if(event.target.files[0])
                                    {
                                        setImgName(event.target.files[0].name)
                                    }
                                    const reader = new FileReader();

                                    reader.onload = (e) => {
                                    const base64 = e.target.result;
                                    setImg(base64);
                                    };

                                    reader.readAsDataURL(event.target.files[0]);

                                    setCamEnable(false)
                                    setKey((key)=>{return key+1})
                                }
                            }} ></Box>

                            {
                                img ?
                                <center><img id='base64' name="image" src={img} height={'200'} width={'300'} alt={imgName}/></center>
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
                            setImg("")
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
                                handleStartCapture()
                                setIsCam(true)
                            }} ></Box>

                            {
                                isCam && !camImg && <center><video autoPlay playsInline muted height={'200'} width={'auto'} ref={videoRef}/></center>
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
                            handleCapture();
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

export default DiseaseDetector