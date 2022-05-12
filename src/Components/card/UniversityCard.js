import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Checkbox, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    AccountBalanceOutlined, AssessmentOutlined,
    Bookmark,
    BookmarkBorderOutlined,
    ForumRounded, GroupsOutlined,
    HomeOutlined,
    LocationCity,
    LocationOnOutlined
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {API_BASE} from "../../Constants/Constants";
import {default as axios} from "axios";

function UniversityCard(props) {
    const {university} = props;
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    async function fetchLogo() {
        try {
            const url = new URL(`${API_BASE}/universities/viewPicture`);
            url.searchParams.set('url', university.logo);
            const response = await axios.get(url.toString());
            if (response.status === 200) {
                setImage("data:image/png;base64," + response.data);
                console.log(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchLogo();
    },[])

    return (
        <Paper variant={"elevation"} elevation={0} style={{
            borderRadius: 8,
            boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
            padding: "20px 15px 5px 15px"
        }}
               square={true}>
            <Box flexDirection={"column"}>
                <Grid xs={12} container flexDirection={"row"} justifyContent={"center"}
                      style={{borderBottom: "1px solid #E0E0E0", paddingBottom: 5}}>
                    <Grid item xs={4} alignSelf={"center"}>
                        <img style={{width: "100%", height: "auto", borderRadius: 8}}
                             src={image}/>
                    </Grid>
                    <Grid item xs={8} paddingLeft={1} alignSelf={"center"}>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 20,
                                        fontWeight: "bold"
                                    }}>{university.name}</Typography>
                    </Grid>
                </Grid>
                <Grid xs={12} container flexDirection={"column"} marginTop={2}>
                    <Grid item xs={12} marginBottom={1}>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{color: "rgb(45, 62, 74)", fontSize: 15}}>
                            {university.description}
                        </Typography>
                    </Grid>
                    {/*<Grid item xs={12} display={"flex"} flexDirection={"row"} marginBottom={1}>*/}
                    {/*    <LocationCity/>*/}
                    {/*    <Typography variant={"h5"} fontFamily={"Inter"} alignSelf={"end"}*/}
                    {/*                style={{color: "rgb(103, 119, 136)", fontSize: 15, marginLeft: 3}}>Location: <strong*/}
                    {/*        style={{color: "rgb(45, 62, 74)"}}>{university.city}</strong></Typography>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} display={"flex"} flexDirection={"row"}>
                        <Grid item xs={6} display={"flex"} flexDirection={"row"}>
                            <LocationOnOutlined style={{color:"rgb(99, 115, 129)",alignSelf:"center",fontSize:25}}/>
                            <Typography variant={"h5"} fontFamily={"Inter"} alignSelf={"center"}
                                        style={{color: "rgb(103, 119, 136)", fontSize: 15, marginLeft: 10}}>{university.address}</Typography>
                        </Grid>
                        <Grid item xs={6} display={"flex"} flexDirection={"row"}>
                            <HomeOutlined style={{color:"rgb(99, 115, 129)",alignSelf:"center",fontSize:25}} alignSelf={"center"}/>
                            <Typography variant={"h5"} fontFamily={"Inter"} alignSelf={"center"}
                                        style={{color: "rgb(103, 119, 136)", fontSize: 15, marginLeft: 10}}>Dormitory</Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} display={"flex"} flexDirection={"row"}>
                        <Grid item xs={6} display={"flex"} flexDirection={"row"}>
                            <GroupsOutlined style={{color:"rgb(99, 115, 129)",alignSelf:"center",fontSize:25}}/>
                            <Typography variant={"h5"} fontFamily={"Inter"} alignSelf={"center"}
                                        style={{color: "rgb(103, 119, 136)", fontSize: 15, marginLeft:10}}>Military</Typography>
                        </Grid>
                        <Grid item xs={6} display={"flex"} flexDirection={"row"}>
                            <AssessmentOutlined style={{color:"rgb(99, 115, 129)",alignSelf:"center",fontSize:25}} alignSelf={"center"}/>
                            <Typography variant={"h5"} fontFamily={"Inter"} alignSelf={"center"}
                                        style={{color: "rgb(103, 119, 136)", fontSize: 15, marginLeft: 10}}>{university.status}</Typography>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid xs={12} item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}
                      style={{padding: "10px 0 10px 0"}}>

                    <Button onClick={()=>navigate(`university/${university.id}`)} variant={"outlined"} id={"primary_button_outlined"}>Learn More</Button>
                    <Checkbox style={{padding: 0}}

                              icon={<BookmarkBorderOutlined style={{fontSize: 35}}/>}
                              checkedIcon={<Bookmark style={{color: "#FFC107", fontSize: 35}}/>}
                    />
                </Grid>
            </Box>
        </Paper>
    );
}

export default UniversityCard;