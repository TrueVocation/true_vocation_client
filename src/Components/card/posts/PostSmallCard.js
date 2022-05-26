import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {API_BASE} from "../../../Constants/Constants";
import {default as axios} from "axios";
import Paper from "@mui/material/Paper";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import "./_post_card.scss"
import Chip from "@mui/material/Chip";

function PostSmallCard({post}) {
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
        <Paper id={"post_small_card"} variant={"elevation"} elevation={0} style={{
            borderRadius: 15,
            padding: "10px",
            cursor:"pointer",
            display:"flex",
            justifyContent:"space-between"
        }} onClick={()=>navigate(`/posts/${1}`)}>
            <Grid item xs={2} container display={"flex"} alignItems={"center"}>
                <img style={{
                    width: "100%",
                    height:"100%",
                    borderRadius:15,
                }}
                     src={picture}/>
            </Grid>
            <Grid container item xs={9.8} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}
            style={{padding:5}}>
                <Grid item marginBottom={1}>
                    <Typography variant={"h3"} style={{
                        fontSize: 17,
                        fontWeight: "600",
                        fontFamily: "Inter",
                        color: "#2d3e4a"
                    }}>
                        {post?.title}
                    </Typography>
                </Grid>
                <Grid item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    {/*<Typography variant={"h3"} style={{*/}
                    {/*    fontSize: 14,*/}
                    {/*    fontWeight: "bold",*/}
                    {/*    fontFamily: "Inter",*/}
                    {/*    color: `#e45159`,*/}
                    {/*}}>*/}
                    {/*    {post?.tag}*/}
                    {/*</Typography>*/}
                    <Chip label={post?.tag} variant="outlined" style={{color:"#e45159",borderColor:"#e45159"}} />
                    <Typography variant={"h3"} style={{
                        fontSize: 14,
                        fontFamily: "Inter",
                        color: "rgb(103, 119, 136)",
                        alignSelf:"end"
                    }}>
                        {post?.createdDate}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default PostSmallCard;