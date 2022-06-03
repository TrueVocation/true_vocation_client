import React, {useEffect, useState} from 'react';
import Paper from "@mui/material/Paper";
import {Checkbox, Divider, Grid, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Bookmark, BookmarkBorderOutlined, Favorite, FavoriteBorder, ModeCommentOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {API_BASE} from "../../../Constants/Constants";
import {default as axios} from "axios";
import Chip from "@mui/material/Chip";
import useAuth from "../../../AuthConfig/useAuth";
import {RenderIf} from "../../RenderIf";

function PostsCardVertical({post}) {
    const [picture, setPicture] = useState('')
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    const {user} = useAuth();

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

    async function userLike() {
        try {
            const url = new URL(`${API_BASE}/user-like`);
            url.searchParams.set('userId', user?.id);
            url.searchParams.set('postId', post?.id);
            const response = await axios.post(url.toString());
            if (response.status === 200) {
                setIsLiked(prevState => !prevState)
                setLikeCount(prevState => prevState-1)
            }
            else if (response.status === 201) {
                setIsLiked(prevState => !prevState)
                setLikeCount(prevState => prevState+1)
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function userFavorite() {
        try {
            const url = new URL(`${API_BASE}/user-favorite`);
            url.searchParams.set('userId', user?.id);
            url.searchParams.set('postId', post?.id);
            const response = await axios.post(url.toString());
            if (response.status === 200) {
                setIsFavorite(prevState => !prevState)
            }
            else if (response.status === 201) {
                setIsFavorite(prevState => !prevState)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        if(post !== null) {
            fetchPicture();
            setIsFavorite(post.favorite)
            setIsLiked(post.liked)
            setLikeCount(post.likeCount)
        }
    },[post])

    return (
        <Paper variant={"elevation"} elevation={0} style={{
            borderRadius: 15,
            width:"100%",
            boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
            padding: "0 0 0 0",
        }} >
            <Grid>
                {picture === '' ?
                    <Skeleton animation="wave" variant="rectangular" style={{
                        width: "100%",
                        height: 500,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    }} />
                    :
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
                }

            </Grid>
            <Grid display={"flex"} flexDirection={"column"} style={{
                padding: "15px 15px 10px 15px"
            }}>
                {post?.title ?
                    <Typography variant={"h3"} style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        color: "#2d3e4a",
                        cursor:"pointer"
                    }} onClick={()=>navigate(`/posts/${post?.id}`)}>
                        {post?.title}
                    </Typography>
                    :
                    <Skeleton animation="wave" variant="rectangular" style={{
                        width:"80%",
                        borderRadius:15,
                        fontSize: 25,
                        fontWeight: "600",
                        fontFamily: "Inter",
                        color: "#2d3e4a"
                    }}/>
                }

                {post?.shortDescription ?
                    <Typography variant={"h3"} style={{
                        fontSize: 17,
                        fontFamily: "Inter",
                        color: "rgb(103, 119, 136)",
                        marginTop: 10
                    }}>
                        {post?.shortDescription}
                    </Typography>
                    :
                    <Skeleton animation="wave" variant="rectangular" style={{
                        width:"100%",
                        height:100,
                        marginTop: 10,
                        borderRadius:15,
                        fontSize: 25,
                    }}/>
                }



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
                    {post?.tag ?
                        <Chip label={post?.tag} variant="filled" />
                        :
                        <Skeleton animation="wave" variant="rectangular" style={{
                            width:"15%",
                            borderRadius:15,
                            fontSize: 25,
                        }}/>
                    }

                    {post?.createdDate ?
                        <Typography variant={"h3"} style={{
                            fontSize: 15,
                            fontFamily: "Inter",
                            color: "rgb(103, 119, 136)",
                            alignSelf:"end"
                        }}>
                            {post?.createdDate}
                        </Typography>
                        :
                        <Skeleton animation="wave" variant="rectangular" style={{
                            width:"20%",
                            borderRadius:15,
                            fontSize: 25,
                        }}/>
                    }


                </Grid>

                <Divider style={{borderColor:"rgb(0, 0, 0, 0.12)",height:10,marginBottom:10}} />
                <Grid item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>

                    {post?.createdDate ?
                        <Grid item alignSelf={"center"}>
                            <Checkbox style={{padding: 0}}
                                      checked={isLiked}
                                      onChange={userLike}
                                      disabled={user == null}
                                      icon={<FavoriteBorder style={{fontSize: 32}}/>}
                                      checkedIcon={<Favorite style={{color: "#FF2052", fontSize: 32}}/>}
                            /> {likeCount}

                            <IconButton disabled={user == null}><ModeCommentOutlined style={{fontSize:30}}/></IconButton>151
                        </Grid>
                        :
                        <Skeleton animation="wave" variant="rectangular" style={{
                            width:"20%",
                            borderRadius:15,
                            fontSize: 25,
                            fontWeight: "600",
                            fontFamily: "Inter",
                            color: "#2d3e4a"
                        }}/>
                    }
                    <RenderIf isTrue={user!=null}>
                        {post?

                            <Grid item alignSelf={"center"}>
                                <Checkbox style={{padding: 0}}
                                          checked={isFavorite}
                                          onChange={userFavorite}
                                          icon={<BookmarkBorderOutlined style={{fontSize: 32}}/>}
                                          checkedIcon={<Bookmark style={{color: "#FFC107", fontSize: 32}}/>
                                          }
                                />
                            </Grid>
                            :
                            <Skeleton animation="wave" variant="rectangular" style={{
                                width:"15%",
                                borderRadius:15,
                                fontSize: 25,
                                fontWeight: "600",
                                fontFamily: "Inter",
                                color: "#2d3e4a"
                            }}/>
                        }
                    </RenderIf>


                </Grid>

            </Grid>
        </Paper>
    );
}

export default PostsCardVertical;