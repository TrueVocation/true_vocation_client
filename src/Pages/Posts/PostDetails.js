import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {Checkbox, Container, Divider, Grid, TextareaAutosize, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Bookmark, BookmarkBorderOutlined, Favorite, FavoriteBorder, ModeCommentOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import UserCommentCard from "../../Components/card/UserCommentCard";
import Button from "@mui/material/Button";

function PostDetails(props) {
    const [showComments, setShowComments] = useState(false)

    return (
        <Box>
            <Container style={{display:"flex", flexDirection:"column"}} maxWidth={"md"}>
                <Grid item xs={12} marginBottom={3}>
                    <img style={{
                        width: "100%",
                        height: "100%",
                        borderRadius:15
                    }}
                         src={"https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}/>

                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h2"} style={{
                        fontSize: 40,
                        fontWeight: "600",
                        fontFamily: "Inter",
                        color: "#2d3e4a"
                    }}>
                        Sed ut perspiciatis
                    </Typography>
                    <Typography variant={"h3"} style={{
                        fontSize: 15,
                        fontFamily: "Inter",
                        color: "rgb(103, 119, 136)",
                        marginBottom:5,
                        marginTop:5
                    }}>
                        16 March 2020
                    </Typography>
                </Grid>
                <Grid item xs={12} marginBottom={3}>
                    <Typography variant={"h3"} style={{
                        fontSize: 17,
                        fontFamily: "Inter",
                        color: "#212B36",
                        marginTop: 10
                    }}>
                        Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc.
                        Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Phasellus viverra nulla ut metus varius laoreet. Praesent egestas tristique nibh. Donec posuere vulputate arcu. Quisque rutrum.

                        Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.

                        Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Phasellus viverra nulla ut metus varius laoreet. Praesent egestas tristique nibh.
                    </Typography>
                    <Divider style={{borderColor:"rgb(0, 0, 0, 0.12)",height:10,marginBottom:10}} />
                    <Grid item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Grid item alignSelf={"center"}>
                            <Checkbox style={{padding: 0}}

                                      icon={<FavoriteBorder style={{fontSize: 32}}/>}
                                      checkedIcon={<Favorite style={{color: "#FF2052", fontSize: 32}}/>}
                            />   256

                            <IconButton onClick={()=>setShowComments(prevState => !prevState)}><ModeCommentOutlined style={{fontSize:30}}/></IconButton>151
                        </Grid>
                        <Grid item alignSelf={"center"}>
                            <Checkbox style={{padding: 0}}

                                      icon={<BookmarkBorderOutlined style={{fontSize: 32}}/>}
                                      checkedIcon={<Bookmark style={{color: "#FFC107", fontSize: 32}}/>}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {showComments ?
                    <Grid item xs={12} marginBottom={3}>
                        <Typography variant={"h2"} style={{
                            fontSize: 25,
                            fontWeight: "600",
                            fontFamily: "Inter",
                            color: "#2d3e4a",
                            marginBottom:10
                        }}>
                            Comments
                        </Typography>
                        <UserCommentCard/>
                        <UserCommentCard/>
                        <UserCommentCard/>
                        <UserCommentCard/>
                        <Grid container flexdirection={"row"} justifyContent={"space-between"}>
                            <Grid item xs={9}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Write your comment here..."
                                    multiline
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={3} display={"flex"} justifyContent={"center"}>
                                <Button id={"primary_button_outlined"} size={"large"} type={"button"} variant="outlined"
                                        fontFamily={"Inter"}>Add Comment</Button>
                            </Grid>
                        </Grid>

                    </Grid> : null
                }


            </Container>
        </Box>
    );
}

export default PostDetails;