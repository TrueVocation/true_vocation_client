import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Checkbox, Divider, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Bookmark, BookmarkBorderOutlined, Favorite, FavoriteBorder, ModeCommentOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import UserCommentCard from "../../Components/card/UserCommentCard";
import Button from "@mui/material/Button";
import "./_posts.scss"
import {useParams} from "react-router-dom";
import {API_BASE} from "../../Constants/Constants";
import {default as axios} from "axios";
import Chip from "@mui/material/Chip";
import useAuth from "../../AuthConfig/useAuth";
import PostSmallCard from "../../Components/card/posts/PostSmallCard";
import {RenderIf} from "../../Components/RenderIf";
import {useInputValue, useUrgentUpdate} from 'react-haiku';
import {useSnackbar} from "notistack";

function PostDetails(props) {
    let {id} = useParams();
    const {user} = useAuth();
    const [showComments, setShowComments] = useState(false)
    const [post, setPost] = useState({});
    const [picture, setPicture] = useState('');
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [commentsCount, setCommentsCount] = useState(0)
    const [posts, setPosts] = useState([])
    const [userComment, setUserComment] = useInputValue();
    const update = useUrgentUpdate();
    const [isOk, setIsOk] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [comments, setComments] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(2)
    const {enqueueSnackbar} = useSnackbar();

    async function fetchPost() {
        try {
            let jwtToken = localStorage.getItem("token");
            const url = new URL(`${API_BASE}/posts/${id}/details`);
            const response = await axios.get(url.toString(), {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            if (response.status === 200) {
                setPost(response.data);
                fetchPicture(response.data);
                setIsFavorite(response.data.favorite)
                setIsLiked(response.data.liked)
                setLikeCount(response.data.likeCount)
                setCommentsCount(response.data.commentCount)
                setComments(response.data.commentsList)
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function addPostComment() {
        if (user === null) {
            enqueueSnackbar(`You are not authorized.Please login to add comments!`, {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
            setUserComment('')
        } else {
            try {
                let jwtToken = localStorage.getItem("token");
                const url = new URL(`${API_BASE}/comments/post`);
                const data = {
                    userDTO: user,
                    post: post,
                    text: userComment
                }
                const response = await axios.post(url.toString(), data, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                });
                if (response.status === 200) {
                    setIsOk(prevState => !prevState)
                    setUserComment('')
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function fetchPicture(post) {
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
                setLikeCount(prevState => prevState - 1)
            } else if (response.status === 201) {
                setIsLiked(prevState => !prevState)
                setLikeCount(prevState => prevState + 1)
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
            } else if (response.status === 201) {
                setIsFavorite(prevState => !prevState)
            }
        } catch (error) {
            console.error(error);
        }
    }


    async function fetchPosts() {
        try {
            const url = new URL(`${API_BASE}/posts`);
            url.searchParams.set('page', 0);
            url.searchParams.set('size', 6);
            url.searchParams.set('sort', "id");
            url.searchParams.set('order', "desc");
            let jwtToken = localStorage.getItem("token");
            const response = await axios.get(url.toString(), {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            if (response.status === 200) {
                setPosts(response.data.content)
            }
        } catch (error) {
            console.error(error);
        }
    }


    const fetchMoreData = () => {
        console.log(comments)
        if (comments.length >= commentsCount) {
            setHasMore(false);
            return;
        }
        const sliceArr = post?.commentsList.slice(startIndex + 2, endIndex + 2);
        setStartIndex(prevState => prevState + 2)
        if (endIndex + 2 > post?.commentsList.length) {
            setEndIndex(post?.commentsList.length)
        } else {
            setEndIndex(prevState => prevState + 2)
        }

        setComments(oldComments => [...oldComments, sliceArr])
    };


    useEffect(() => {
        fetchPost();
        fetchPosts();
    }, [isOk])

    return (
        <Box style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "rgb(242, 245, 249)"
        }}>
            <Grid container display={"flex"} flexDirection={"row"} xs={9} alignSelf={"center"}
                  justifyContent={"space-between"}>
                <Grid item xs={12} lg={7.7} style={{display: "flex", flexDirection: "column", paddingTop: 20}}
                      maxWidth={"lg"}>
                    <Grid item xs={12} container justifyContent={"center"}>
                        <img style={{
                            height: window.innerHeight * 0.5,
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: 15
                        }} src={picture}/>
                    </Grid>
                    <Grid container xs={12} display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"space-between"}>

                        <Grid item xs={12}>
                            <Typography variant={"h2"} style={{
                                fontSize: 40,
                                fontWeight: "600",
                                fontFamily: "Inter",
                                color: "#2d3e4a",
                                marginBottom: 10,
                                marginTop: 10
                            }}>
                                {post?.title}
                            </Typography>
                            <Grid container display={"flex"}
                                  flexDirection={"row"}
                                  justifyContent={"space-between"}>
                                <Typography variant={"h3"} style={{
                                    fontSize: 18,
                                    fontFamily: "Inter",
                                    color: "rgb(103, 119, 136)",
                                    marginBottom: 5,
                                    marginTop: 5
                                }}>
                                    16 March 2020
                                </Typography>
                                <Chip label={post?.tag} style={{fontWeight: "500", fontSize: 18}} variant="filled"/>
                            </Grid>

                        </Grid>


                    </Grid>

                    <Grid item xs={12}>


                    </Grid>
                    <Grid item xs={12} marginBottom={3}>
                        <Typography variant={"h3"} style={{
                            fontSize: 20,
                            fontFamily: "Inter",
                            color: "#212B36",
                            marginTop: 10
                        }}>
                            {post.description}
                        </Typography>

                        <Grid item container display={"flex"} mt={2} flexDirection={"row"} justifyContent={"space-between"}>
                            <Grid item alignSelf={"center"}>
                                <Checkbox style={{padding: 0}}
                                          checked={isLiked}
                                          onChange={userLike}
                                          disabled={user == null}
                                          icon={<FavoriteBorder style={{fontSize: 32}}/>}
                                          checkedIcon={<Favorite style={{color: "#FF2052", fontSize: 32}}/>}
                                /> {likeCount}

                                <IconButton disabled={user == null}><ModeCommentOutlined
                                    style={{fontSize: 30}}/></IconButton>{commentsCount}
                            </Grid>
                            <RenderIf isTrue={user != null}>
                                <Grid item alignSelf={"center"}>
                                    <Checkbox style={{padding: 0}}
                                              checked={isFavorite}
                                              onChange={userFavorite}
                                              icon={<BookmarkBorderOutlined style={{fontSize: 32}}/>}
                                              checkedIcon={<Bookmark style={{color: "#FFC107", fontSize: 32}}/>}
                                    />
                                </Grid>
                            </RenderIf>

                        </Grid>
                        <Divider style={{borderColor: "rgb(0, 0, 0, 0.12)", height: 10}}/>
                    </Grid>


                    <Grid item xs={12} marginBottom={3}>
                        <Typography variant={"h2"} style={{
                            fontSize: 25,
                            fontWeight: "600",
                            fontFamily: "Inter",
                            color: "#2d3e4a",
                            marginBottom: 20
                        }}>
                            Comments
                        </Typography>
                        {
                            comments.map(comment => {
                                return <UserCommentCard key={comment?.id} comment={comment} setIsOk={setIsOk}
                                                        isOk={isOk}/>
                            })
                        }
                        {/*<div*/}
                        {/*    id="scrollableDiv"*/}
                        {/*    style={{*/}
                        {/*        height: 300,*/}
                        {/*        overflow: 'auto',*/}
                        {/*        display: 'flex',*/}
                        {/*        flexDirection: 'column-reverse',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*<InfiniteScroll*/}
                        {/*    dataLength={comments.length}*/}
                        {/*    next={fetchMoreData}*/}
                        {/*    hasMore={hasMore}*/}
                        {/*    inverse={true} //*/}
                        {/*    height={300}*/}
                        {/*    loader={<h4>Loading...</h4>}*/}
                        {/*    scrollableTarget="scrollableDiv"*/}
                        {/*    endMessage={*/}
                        {/*        <p style={{ textAlign: "center" }}>*/}
                        {/*            <b>Yay! You have seen it all</b>*/}
                        {/*        </p>*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    {comments?.map((comment) => (*/}
                        {/*        <UserCommentCard key={comment?.id} comment={comment} />*/}
                        {/*    ))}*/}
                        {/*</InfiniteScroll>*/}
                        {/*</div>*/}
                        <Grid container flexdirection={"row"} justifyContent={"space-between"}>
                            <Grid item xs={9}>
                                <TextField
                                    fullWidth
                                    value={userComment}
                                    onChange={setUserComment}
                                    id="outlined-multiline-flexible"
                                    label="Write your comment here..."
                                    multiline
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={3} display={"flex"} justifyContent={"center"}>
                                <Button onClick={addPostComment} id={"primary_button_outlined"} size={"large"}
                                        type={"button"} variant="outlined"
                                        fontFamily={"Inter"}>Add Comment</Button>
                            </Grid>
                        </Grid>

                    </Grid>


                </Grid>
                <Grid item xs={12} lg={4}>
                    <Grid item xs={12} style={{paddingTop: 20}}>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "#2d3e4a",
                                        marginBottom: 15,
                                        fontWeight: "bold",
                                        fontSize: 20
                                    }}>
                            Latest News
                        </Typography>

                        {
                            posts.map(post => {
                                return <Grid key={post.id} item xs={12} marginBottom={2}>
                                    <PostSmallCard post={post}/>
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>


        </Box>
    );
}

export default PostDetails;