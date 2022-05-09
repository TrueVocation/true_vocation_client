import React from 'react';
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import PostsCardVertical from "../../Components/card/posts/PostsCardVertical";

function Posts(props) {
    return (
        <Box>
            <Grid container justifyContent={"center"}>
                <Grid item xs={4} style={{minHeight:window.innerHeight * 0.9}}>
                    <PostsCardVertical/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Posts;