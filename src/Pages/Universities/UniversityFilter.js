import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";

function UniversityFilter(props){

    return(
        <Box sx={{display:"flex", flexDirection:"row"}}>
            <Grid container item xs={12} display={"flex"} justifyContent={"center"} flexDirection={"row"}
                  alignSelf={"center"}>
                <Grid xs={10} container mt={7} item display={"flex"} flexdirection={"row"} justifyContent={"space-between"}>
                    <Grid item xs={8}>
                        <Card sx={{ maxWidth: 345 }}>
                            <Box sx={{backgroundImage:'https://adaldyq.kz/assets/images/univerimg/univer_4.jpg'}}>
                                {/*<CardMedia*/}
                                {/*    component="img"*/}
                                {/*    alt="green iguana"*/}
                                {/*    height="140"*/}
                                {/*    image="https://adaldyq.kz/assets/images/univerimg/univer_4.jpg">*/}

                                {/*</CardMedia>*/}
                                <CardMedia
                                    style={{width:'80px',height:'80px',paddingBottom:'50px'}}
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image="https://adaldyq.kz/assets/images/univerimg/univer_4.jpg"
                                />
                            </Box>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        89
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UniversityFilter;