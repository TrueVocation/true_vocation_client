import React from 'react';
import Paper from "@mui/material/Paper";
import {Checkbox, Divider, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Bookmark, BookmarkBorderOutlined, Favorite, FavoriteBorder, ModeCommentOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";

function PostsCardVertical(props) {
    const navigate = useNavigate();
    return (
        <Paper variant={"elevation"} elevation={0} style={{
            borderRadius: 15,
            boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
            padding: "0 0 0 0",
            cursor:"pointer"
        }} onClick={()=>navigate(`/posts/${1}`)}>
            <Grid style={{padding:10}}>
                <img style={{
                    width: "100%",
                    borderRadius:15
                }}
                     src={"https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}/>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"} style={{
                padding: "15px 15px 10px 15px"
            }}>
                <Typography variant={"h3"} style={{
                    fontSize: 15,
                    fontFamily: "Inter",
                    color: "rgb(103, 119, 136)",
                    marginBottom:5
                }}>
                    16 March 2020
                </Typography>

                <Typography variant={"h3"} style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    color: "#2d3e4a"
                }}>
                    Sed ut perspiciatis
                </Typography>



                <Typography variant={"h3"} style={{
                    fontSize: 17,
                    fontFamily: "Inter",
                    color: "rgb(103, 119, 136)",
                    marginTop: 10
                }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Typography>


                <Divider style={{borderColor:"rgb(0, 0, 0, 0.12)",height:10,marginBottom:10}} />
                <Grid item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    <Grid item alignSelf={"center"}>
                        <Checkbox style={{padding: 0}}

                                  icon={<FavoriteBorder style={{fontSize: 32}}/>}
                                  checkedIcon={<Favorite style={{color: "#FF2052", fontSize: 32}}/>}
                        />   256

                        <IconButton><ModeCommentOutlined style={{fontSize:30}}/></IconButton>151
                    </Grid>
                    <Grid item alignSelf={"center"}>
                        <Checkbox style={{padding: 0}}

                                  icon={<BookmarkBorderOutlined style={{fontSize: 32}}/>}
                                  checkedIcon={<Bookmark style={{color: "#FFC107", fontSize: 32}}/>}
                        />
                    </Grid>
                </Grid>

            </Grid>
        </Paper>
    );
}

export default PostsCardVertical;