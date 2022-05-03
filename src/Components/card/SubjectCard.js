import React from 'react';
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";

function SubjectCard(props) {
    const navigate = useNavigate();

    const {height, width, subject} = props;

    return (
        <Paper variant={"elevation"} id={"paper_hover"} elevation={0}
               style={{paddingBottom: 32, borderRadius: 8, boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",cursor:"pointer",width:width, height:height,
               backgroundImage:`url(${subject.picture})`,
               backgroundRepeat:"no-repeat"}}
               square={true} onClick={()=>navigate(`/subject/${subject.id}`,true)}>
            <Box display={"flex"} flexDirection={"column"} style={{height:"100%"}}  justifyContent={"end"}>
                {/*<Grid container item flexDirection={"row"} justifyContent={"center"}>*/}
                {/*    <img style={{width:"100%", height:"100%", borderTopRightRadius:8, borderTopLeftRadius:8}} src={"https://images.pexels.com/photos/68173/flash-tesla-coil-experiment-faradayscher-cage-68173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} />*/}
                {/*</Grid>*/}
                <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"start"}
                            style={{
                                color: "white",
                                marginTop: 20,
                                marginLeft: 20,
                                fontSize: 25,
                                fontWeight: "bold"
                            }}>{subject.name}</Typography>
            </Box>
        </Paper>
    );
}

export default SubjectCard;