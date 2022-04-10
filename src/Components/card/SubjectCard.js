import React from 'react';
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import {ReactComponent as Logo} from "../../images/113-atom (2).svg";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function SubjectCard(props) {
    return (
        <Paper variant={"elevation"} id={"paper_hover"} elevation={0}
               style={{padding: 32, borderRadius: 8, boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px"}}
               square={true}>
            <Box flexDirection={"column"} width={150}>
                <Grid container flexDirection={"row"} justifyContent={"center"}>
                    <Logo style={{alignSelf: "center", width: 120}}/>
                </Grid>
                <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                            style={{
                                color: "rgb(45, 62, 74)",
                                marginTop: 20,
                                fontSize: 20,
                                fontWeight: "bold"
                            }}>Physics</Typography>
            </Box>
        </Paper>
    );
}

export default SubjectCard;