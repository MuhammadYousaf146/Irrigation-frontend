import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import OpacityIcon from '@mui/icons-material/Opacity';
import { tokens } from '../theme';
import React from 'react'
import { useTheme } from '@emotion/react';


const HumidityCard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Card sx={{borderRadius:'22px', backgroundColor:colors.primary[400]}}>
            <CardHeader title="Humidity" subheader="Gujrat, PK"/>
            <CardContent>
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <Typography variant='h3'>{props.value}%</Typography>
                    <OpacityIcon sx={{ width: 40, height: 40 }}/>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default HumidityCard