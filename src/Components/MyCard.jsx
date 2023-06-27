import { Box, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import React, { useState, useEffect } from 'react'
import { tokens } from '../theme';
import { useTheme } from '@emotion/react';



const MyCard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



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
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <Typography color={colors.greenAccent[500]} variant='h4' p={1}>{props.value}</Typography>
                    {props.icon}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default MyCard