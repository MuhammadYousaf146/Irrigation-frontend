import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import React from 'react'
import WaterIcon from '@mui/icons-material/Water';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';


const MoistureCard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
        <Card sx={{borderRadius:'22px', backgroundColor:colors.primary[400]}}>
            <CardHeader title="Moisture" subheader="Gujrat, PK"/>
            <CardContent>
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <Typography variant='h3'>{props.value}{'\u00b0'}C</Typography>
                    <WaterIcon sx={{ width: 40, height: 40 }}/>
                </Stack>
            </CardContent>
        </Card>
  )
}

export default MoistureCard
