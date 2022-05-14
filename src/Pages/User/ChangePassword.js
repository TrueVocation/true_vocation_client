import React from 'react';
import {Divider, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function ChangePassword(props) {
    return (
        <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <Grid item xs={12} sm={12} md={4} marginBottom={3}>
                <Paper variant={"elevation"} elevation={0} style={{
                    borderRadius: 8,
                    boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                }}
                       square={true}>
                    <Grid container display={"flex"} flexDirection={"row"} justifyContent={"center"}
                          alignItems={"center"}>
                        <Grid item container xs={12} style={{padding: "25px 25px"}}>
                            <Typography variant={"h3"} style={{
                                fontSize: 20,
                                fontWeight:"600",
                                fontFamily: "Inter",
                                color: "rgb(45, 62, 74)",
                                textAlign:"center"
                            }}>
                                Change Password
                            </Typography>

                        </Grid>
                        <Grid item xs={12} marginBottom={3}>
                            <Divider/>
                        </Grid>
                        <Grid item xs={6} marginBottom={1}>

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

        </Grid>
    );
}

export default ChangePassword;