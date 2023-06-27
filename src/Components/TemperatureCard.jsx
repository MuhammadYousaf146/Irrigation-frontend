import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import React, { useState, useEffect } from 'react'
import { tokens } from '../theme';
import { useTheme } from '@emotion/react';



const TemperatureCard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    return (
        <Card sx={{borderRadius:'22px', backgroundColor:colors.primary[400]}}>
            <CardHeader backgroundColor='red' title="Temperature" subheader="Gujrat, PK"/>
            <CardContent>
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <Typography variant='h3'>{props.value}{'\u00b0'}C</Typography>
                    <WbSunnyIcon sx={{ width: 40, height: 40 }}/>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default TemperatureCard