import React from 'react';
import Paper from "@mui/material/Paper";
import {Checkbox, Divider, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Bookmark, BookmarkBorderOutlined, Favorite, FavoriteBorder, ModeCommentOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function PostsCardHorizontal(props) {
    return (
        <Paper variant={"elevation"} elevation={0} style={{
            borderRadius: 15,
            boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
            cursor:"pointer"
        }}>
            <Grid container display={"flex"} flexDirection={"row"}>

            <Grid item xs={4} style={{padding:20}}>
                <img style={{
                    width: "100%",
                    height: "100%",
                    borderRadius:15
                }}
                     src={"https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}/>
            </Grid>

            <Grid item xs={8} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} style={{
                padding: "20px 20px 10px 10px"
            }}>
                <Grid item>
                    <Typography variant={"h3"} style={{
                        fontSize: 23,
                        fontWeight: "600",
                        fontFamily: "Inter",
                        color: "#2d3e4a"
                    }}>
                        Sed ut perspiciatis
                    </Typography>



                    <Typography variant={"h3"} style={{
                        fontSize: 17,
                        fontFamily: "Inter",
                        color: "rgb(99, 115, 129)",
                        marginTop: 10
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </Typography>
                    <Typography variant={"body2"} style={{
                        fontSize: 15,
                        fontFamily: "Inter",
                        color: "rgb(103, 119, 136)",
                        fontWeight:400,
                        marginTop: 10
                    }}>
                       16 Mar 2020
                    </Typography>
                </Grid>

                <Grid item>
                    <Divider style={{borderColor:"rgb(0, 0, 0, 0.12)",height:10,marginBottom:10}} />
                    <Grid item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Grid item alignSelf={"center"}>
                            <Checkbox style={{padding: 0}}

                                      icon={<FavoriteBorder style={{fontSize: 32}}/>}
                                      checkedIcon={<Favorite style={{color: "#FF2052", fontSize: 32}}/>}
                            /> 256

                            <IconButton style={{padding:0,marginLeft:10}}><ModeCommentOutlined style={{fontSize:30}}/></IconButton> 251
                        </Grid>
                        <Grid item alignSelf={"center"}>
                            <Checkbox style={{padding: 0}}

                                      icon={<BookmarkBorderOutlined style={{fontSize: 32}}/>}
                                      checkedIcon={<Bookmark style={{color: "#FFC107", fontSize: 32}}/>}
                            />
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>

            </Grid>
        </Paper>
    );
}

export default PostsCardHorizontal;