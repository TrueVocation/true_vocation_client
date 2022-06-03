import React, {useEffect, useState} from 'react';
import Paper from "@mui/material/Paper";
import {Checkbox, Grid, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Bookmark, BookmarkBorderOutlined, Favorite, FavoriteBorder, ModeCommentOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {API_BASE} from "../../../Constants/Constants";
import {default as axios} from "axios";
import Chip from "@mui/material/Chip";
import useAuth from "../../../AuthConfig/useAuth";
import {RenderIf} from "../../RenderIf";

function PostsCardHorizontal({post}) {
    const [picture, setPicture] = useState('')
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
        fetchPicture();
        setIsFavorite(post.favorite)
        setIsLiked(post.liked)
        setLikeCount(post.likeCount)
    },[post])

    return (
        <Paper variant={"elevation"} elevation={0} style={{
            borderRadius: 15,
            width:"100%",
            boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
            cursor: "pointer"
        }}>
            <Grid container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>

                <Grid item xs={4}>
                    {picture === '' ?
                        <Skeleton animation="wave" variant="rectangular" style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 15,
                            borderBottomLeftRadius: 15
                        }} />
                        :
                        <img style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 15,
                            borderBottomLeftRadius: 15
                        }}
                             src={picture}/>
                    }

                </Grid>

                <Grid item xs={7.9} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} style={{
                    padding: "20px 20px 10px 10px"
                }}>
                    <Grid item>
                        {/*<Typography variant={"h3"} style={{*/}
                        {/*    fontSize: 16,*/}
                        {/*    fontWeight: "bold",*/}
                        {/*    fontFamily: "Inter",*/}
                        {/*    color: `#e45159`,*/}
                        {/*    marginBottom: 8*/}
                        {/*}}>*/}
                        {/*    {post?.tag}*/}
                        {/*</Typography>*/}
                        <Grid item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>

                            {post?.title ?
                                <Typography variant={"h3"} style={{
                                    fontSize: 25,
                                    fontWeight: "600",
                                    fontFamily: "Inter",
                                    color: "#2d3e4a"
                                }}>
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

                            {post?.tag ?
                                <Chip label={post?.tag} variant="filled" style={{marginBottom:8}} />
                                :
                                <Skeleton animation="wave" variant="rectangular" style={{
                                    width:"15%",
                                    borderRadius:15,
                                    fontSize: 25,
                                }}/>
                            }


                        </Grid>


                        {post?.shortDescription ?
                            <Typography variant={"h3"} style={{
                                fontSize: 17,
                                fontFamily: "Inter",
                                color: "rgb(99, 115, 129)",
                                marginTop: 10
                            }}>
                                {post?.shortDescription}
                            </Typography>
                            :
                            <Skeleton animation="wave" variant="rectangular" style={{
                                width:"100%",
                                height:150,
                                marginTop: 10,
                                borderRadius:15,
                                fontSize: 25,
                            }}/>
                        }

                        {post?.createdDate ?
                            <Typography variant={"body2"} style={{
                                fontSize: 15,
                                fontFamily: "Inter",
                                color: "rgb(103, 119, 136)",
                                fontWeight: 400,
                                marginTop: 10,
                                marginBottom:5
                            }}>
                                {post?.createdDate}
                            </Typography>
                            :
                            <Skeleton animation="wave" variant="rectangular" style={{
                                width:"20%",
                                height:150,
                                marginTop: 10,
                                borderRadius:15,
                                fontSize: 25,
                            }}/>
                        }



                    </Grid>

                    <Grid item>
                        {/*<Divider style={{borderColor:"rgb(0, 0, 0, 0.12)",height:10,marginBottom:10}} />*/}
                        <Grid item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>

                            {post?
                                <Grid item alignSelf={"center"}>
                                    <Checkbox style={{padding: 0}}
                                              checked={isLiked}
                                              onChange={userLike}
                                              disabled={user == null}
                                              icon={<FavoriteBorder style={{fontSize: 32}}/>}
                                              checkedIcon={<Favorite style={{color: "#FF2052", fontSize: 32}}/>}
                                    /> {likeCount}

                                    <IconButton disabled={user == null} style={{padding: 0, marginLeft: 10}}><ModeCommentOutlined
                                        style={{fontSize: 30}}/></IconButton> {post?.commentCount}
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


                </Grid>

            </Grid>
        </Paper>
    );
}

export default PostsCardHorizontal;