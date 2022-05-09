import React from 'react';
import Box from "@mui/material/Box";
import {Checkbox, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Bookmark, BookmarkBorderOutlined, ForumRounded, LocationCity, LocationOnOutlined} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";

function UniversityCard(props) {
    const {university} = props;

    const navigate = useNavigate();

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
                             src={university.image}/>
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
                    <Grid item xs={12} display={"flex"} flexDirection={"row"} marginBottom={1}>
                        <LocationOnOutlined/>
                        <Typography variant={"h5"} fontFamily={"Inter"} alignSelf={"end"}
                                    style={{color: "rgb(103, 119, 136)", fontSize: 15, marginLeft: 3}}>Address: <strong
                            style={{color: "rgb(45, 62, 74)"}}>{university.address}</strong></Typography>
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