import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import Header from './Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import { ResponsiveLine } from "@nivo/line";
//import { mockLineData as data } from './data'

const LineChart = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // console.log(props.graphBy)
    // console.log(props.data)
    // console.log(props.temp)
  return (
    <Box m={'20px'}>
        <Box display={'flex'} justifyContent={'space-between'}>
            <Box>
                <Header title={props.title} subtitle={props.subtitle}/>
            </Box>
            <Box width={"15%"}>
                <FormControl fullWidth color='secondary'>
                    <InputLabel>{"Graph By"}</InputLabel>
                    <Select
                        value={props.graphBy}
                        label="Graph By"
                        onChange={(event)=>{
                            props.handleGraphChange(event);
                        }}
                    >
                        <MenuItem value={"Hours"}>Hours</MenuItem>
                        <MenuItem value={"Days"}>Days</MenuItem>

                        {/* {//map function for objects in js
                        Object.keys(props.fields).map(function(key, value) {
                            return(
                            <MenuItem key={key} value={props.fields[key].boardID}>{props.fields[key].boardID}</MenuItem>
                            );
                        })
                        } */}
                    </Select>
                </FormControl>
            </Box>
        </Box>
        <Box height={'60vh'} width={'100%'} maxWidth={'160vh'}>
            <ResponsiveLine
                data={[{"id":props.title,"data":props.data}]}
                theme={{
                    axis: {
                    domain: {
                        line: {
                        stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                        fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                        stroke: colors.grey[100],
                        strokeWidth: 1,
                        },
                        text: {
                        fill: colors.grey[100],
                        },
                    },
                    },
                    legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                    },
                    tooltip: {
                    container: {
                        color: colors.primary[500],
                    },
                    },
                }}
                colors={props.isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: props.isDashboard ? undefined : "DateTime", // added
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    orient: "left",
                    tickValues: 5, // added
                    tickSize: 3,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: props.isDashboard ? undefined : props.title, // added
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                enableGridX={false}
                enableGridY={false}
                pointSize={8}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                        {
                        on: "hover",
                        style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1,
                        },
                        },
                    ],
                    },
                ]}
                />
        </Box>
    </Box>
  );
}

export default LineChart