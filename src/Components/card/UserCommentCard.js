import React from 'react';
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function UserCommentCard(props) {
    return (
        <Grid container display={"flex"} flexdirection={"row"} marginBottom={5}>
            <Grid item xs={1.2}>
                <Avatar sx={{height:70, width:70}} alt="Remy Sharp" src="https://cdn.vox-cdn.com/thumbor/8w6m6Sdl8fkNt7UWPJr5hhNasqA=/0x0:1500x750/1400x1400/filters:focal(762x94:1002x334):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/51717777/strange.0.jpg" />
            </Grid>
            <Grid item flexdirection={"column"} xs={10.5}>
                <Typography variant={"h2"} style={{
                    fontSize: 17,
                    fontWeight: "600",
                    fontFamily: "Inter",
                    color: "#2d3e4a"
                }}>
                    Doctor Strange
                </Typography>
                <Typography variant={"h3"} style={{
                    fontSize: 16,
                    fontFamily: "Inter",
                    color: "#212B36",
                    marginTop: 8
                }}>
                    Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Phasellus viverra nulla ut metus varius laoreet. Praesent egestas tristique nibh. Donec posuere vulputate arcu.
                </Typography>
            </Grid>
        </Grid>
    );
}

export default UserCommentCard;