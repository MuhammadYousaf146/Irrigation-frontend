import { Box, Card, CardContent, CardHeader, Stack, Typography, Switch } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import React, { useState, useEffect } from 'react'
import { tokens } from '../theme';
import { useTheme } from '@emotion/react';



const MyCard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //console.log(props)

    return (
        <Card sx={{borderRadius:'22px', backgroundColor:colors.primary[400]}}>
            {/* <CardHeader title={props.title} subheader={props.subtitle}/> */}
            <Box p={3}>
                <Typography variant='h3' color={colors.grey[100]}>
                    {props.title}
                </Typography>
                <Typography variant='h5' color={colors.greenAccent[500]}>
                    {props.subtitle}
                </Typography>
            </Box>
            <CardContent>
                {!props.isAuto && !props.water && <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <Typography color={colors.greenAccent[500]} variant='h4' p={1}>{props.value}</Typography>
                    {props.icon}
                </Stack>}
                {
                    props.isAuto &&
                    <Box display={'flex'}>
                        <Typography color={colors.greenAccent[500]} variant='h4' p={1}>Auto</Typography>
                        <Switch
                            checked={props.checked}
                            onChange={props.onChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Typography color={colors.greenAccent[500]} variant='h4' p={1}>Manual</Typography>
                    </Box>
                }
                {
                    props.water && <Box display={'flex'} direction={'column'} justifyContent={'space-around'}>
                        <Box>
                            <Switch
                                checked={props.motor1}
                                onChange={props.onMotor1Change}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Box>
                        <Box>
                            <Switch
                                checked={props.motor2}
                                onChange={props.onMotor2Change}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Box>
                        
                    </Box>
                }
            </CardContent>
        </Card>
    )
}

export default MyCard