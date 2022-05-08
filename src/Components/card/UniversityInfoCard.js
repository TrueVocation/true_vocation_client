import React from 'react';
import Paper from "@mui/material/Paper";
import {Grid} from "@mui/material";
import {SchoolOutlined} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function UniversityInfoCard(props) {

    const {text, icon, backColor} = props

    return (
        <Paper variant={"elevation"} elevation={0} style={{
            borderRadius: 15,
            boxShadow: "0 3px 16px 0 rgb(114 114 114 / 30%)",
            padding: "15px 25px 15px 20px",
            marginRight:20,
            cursor:"pointer",
        }}
               square={true}>
            <Grid container display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Avatar variant={"circular"} style={{
                    width: 50,
                    height: 50,
                    backgroundColor: backColor,
                    marginRight:10
                }}>

                    {icon}
                </Avatar>
                <Typography variant={"h6"} fontFamily={"Inter"} fontWeight={"bold"}
                            style={{color: "#2d3e4a", marginBottom: 0}}>{text.text}</Typography>
                <Typography variant={"h6"} fontFamily={"Inter"} fontWeight={"bold"} marginLeft={3}
                            style={{color: "#2d3e4a", marginBottom: 0}}>{text.number}</Typography>
            </Grid>
        </Paper>
    );
}

export default UniversityInfoCard;