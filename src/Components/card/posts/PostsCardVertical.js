import React, {useEffect, useState} from 'react';
import Paper from "@mui/material/Paper";
import {Checkbox, Divider, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Bookmark, BookmarkBorderOutlined, Favorite, FavoriteBorder, ModeCommentOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {API_BASE} from "../../../Constants/Constants";
import {default as axios} from "axios";
import Chip from "@mui/material/Chip";

function PostsCardVertical({post}) {
    const [picture, setPicture] = useState('')
    const navigate = useNavigate();

    async function fetchPicture() {
        try {
            const url = new URL(`${API_BASE}/posts/viewPicture`);
            url.searchParams.set('url', post?.picture);
            const response = await axios.get(url.toString());
            if (response.status === 200) {
                const contentType = response.headers['content-type']
                setPicture(`data:${contentType};base64,` + response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchPicture();
    })

    return (
        <Paper variant={"elevation"} elevation={0} style={{
            borderRadius: 15,
            boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
            padding: "0 0 0 0",
            cursor:"pointer"
        }} onClick={()=>navigate(`/posts/${1}`)}>
            <Grid>
                <img style={{
                    objectFit:"cover",
                    width:"100%",
                    height:"100%",
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,
                    borderBottomStyle:"solid",
                    borderBlockWidth:"thin",
                    borderBottomColor:"rgba(0, 0, 0, 0.12)"
                }}
                     src={picture}/>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"} style={{
                padding: "15px 15px 10px 15px"
            }}>
                <Typography variant={"h3"} style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    color: "#2d3e4a"
                }}>
                    {post?.title}
                </Typography>



                <Typography variant={"h3"} style={{
                    fontSize: 17,
                    fontFamily: "Inter",
                    color: "rgb(103, 119, 136)",
                    marginTop: 10
                }}>
                    {post?.shortDescription}
                </Typography>

                <Grid container display={"flex"} flexDirection={"row"} justifyContent={"space-between"} marginTop={2}>
                    {/*<Typography variant={"h3"} style={{*/}
                    {/*    fontSize: 16,*/}
                    {/*    fontWeight: "bold",*/}
                    {/*    fontFamily: "Inter",*/}
                    {/*    color: `#e45159`,*/}
                    {/*    marginBottom: 8*/}
                    {/*}}>*/}
                    {/*    {post?.tag}*/}
                    {/*</Typography>*/}
                    <Chip label={post?.tag} variant="outlined" style={{color:"#e45159",borderColor:"#e45159"}} />
                    <Typography variant={"h3"} style={{
                        fontSize: 15,
                        fontFamily: "Inter",
                        color: "rgb(103, 119, 136)",
                        alignSelf:"end"
                    }}>
                        {post?.createdDate}
                    </Typography>
                </Grid>

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