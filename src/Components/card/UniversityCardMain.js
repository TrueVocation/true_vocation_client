import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {API_BASE} from "../../Constants/Constants";
import {default as axios} from "axios";
import Box from "@mui/material/Box";
import {Checkbox, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextTruncate from "react-text-truncate";
import {Bookmark, BookmarkBorderOutlined, GroupsOutlined, HomeOutlined, LocationOnOutlined} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

function UniversityCardMain(props) {
    const {university} = props;
    const [picture, setPicture] = useState('');
    const [logo, setLogo] = useState('');

    const navigate = useNavigate();

    async function fetchLogo() {
        try {
            const url = new URL(`${API_BASE}/universities/viewPicture`);
            url.searchParams.set('url', university.logo);
            const response = await axios.get(url.toString());
            if (response.status === 200) {
                const contentType = response.headers['content-type']
                setLogo(`data:${contentType};base64,` + response.data);
                console.log(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchPicture() {
        try {
            const url = new URL(`${API_BASE}/universities/getPictures/${university.id}`);
            const response = await axios.get(url.toString());
            if (response.status === 200) {
                const contentType = response.headers['content-type']
                setPicture(`data:${contentType};base64,` + response.data);
                console.log(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchLogo();
        fetchPicture();
    },[])
    return (
        <Paper variant={"elevation"} elevation={0} style={{
            borderRadius: 12,
            boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
            margin:15
        }}
               square={true}>
            <Box flexDirection={"column"}>
                <Grid xs={12} container flexDirection={"row"} style={{position:"relative"}}>
                    <Grid item xs={12}>
                        <img style={{objectFit:"cover",width:"100%", height: "150px", borderTopRightRadius:8, borderTopLeftRadius:8}}
                             src={picture}/>
                    </Grid>
                    <Grid item xs={2.6} alignSelf={"center"} style={{
                        position:"absolute",
                        top:113,
                        left:20,
                    }}>
                        <img style={{width: "100%", height: "auto", borderRadius: 8}}
                             src={logo}/>
                    </Grid>
                </Grid>
                <Grid xs={12} container flexDirection={"column"} marginTop={5} style={{padding:"15px 15px 0 15px"}}>
                    <Grid item xs={12} mb={1}>
                        <Typography onClick={()=>navigate(`/university/${university?.id}`)} variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        cursor:"pointer",
                                        height:50
                                    }}>{university.name}</Typography>
                    </Grid>
                    {/*<Grid item xs={12} marginBottom={1}>*/}
                    {/*    <Typography variant={"h5"} fontFamily={"Inter"}*/}
                    {/*                style={{color: "rgb(45, 62, 74)", fontSize: 15}}>*/}
                    {/*        <TextTruncate*/}
                    {/*            line={3}*/}
                    {/*            element="span"*/}
                    {/*            truncateText="…"*/}
                    {/*            text={university?.description}*/}
                    {/*        />*/}
                    {/*    </Typography>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} display={"flex"} flexDirection={"row"} marginBottom={1}>
                        <Grid item xs={12} display={"flex"} flexDirection={"row"}>
                            {/*<LocationOnOutlined style={{color:"rgb(99, 115, 129)",alignSelf:"center",fontSize:25}}/>*/}
                            <Typography variant={"h5"} fontFamily={"Inter"} alignSelf={"center"}
                                        style={{color: "rgb(103, 119, 136)", fontSize: 15}}>{university?.address}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}
                      style={{padding: "0 15px 15px 15px"}}>
                    <Typography variant={"h5"} fontFamily={"Inter"} alignSelf={"center"}
                                style={{
                                    color: "rgb(45, 62, 74)",
                                    fontSize: 16,
                                    fontWeight: "500",
                                }}>{university.status}</Typography>
                    <Checkbox style={{padding: 0}}

                              icon={<BookmarkBorderOutlined style={{fontSize: 35}}/>}
                              checkedIcon={<Bookmark style={{color: "#FFC107", fontSize: 35}}/>}
                    />
                </Grid>
            </Box>
        </Paper>
    );
}

export default UniversityCardMain;