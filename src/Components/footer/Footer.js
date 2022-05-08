import React from 'react';
import Box from "@mui/material/Box";
import {Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ReactComponent as Logo} from '../../images/Footer-Logo.svg';
import {ReactComponent as AppStore} from '../../images/App_Store_(iOS)-Badge-Logo.wine.svg';
import {ReactComponent as GooglePlay} from '../../images/Google_Play-Badge-Logo.wine.svg';
import {Facebook, GitHub, Twitter, YouTube} from "@mui/icons-material";
import {Link} from "react-router-dom";
import '../links/links.scss'

function Footer(props) {
    return (
        <Box display={"flex"} flexDirection={"column"} sx={{backgroundColor:"#0c0e30",paddingBottom:2,paddingTop:8,marginBottom:0}}>
            <Grid container xs={10} alignSelf={"center"} rowSpacing={2} columnSpacing={{md:4, sm:4, xs:4}} style={{paddingLeft:0,paddingRight:0, marginBottom:80}}  >


                <Grid item xl={4} lg={4} md={4} sm={12} xs={12} container display={"flex"}  direction={"row"} flexDirection={"column"} >
                    <Grid item xs={12} container display={"flex"} flexDirection={"row"} rowSpacing={{xs:1,sm:1}} >
                        <Grid item xs={12} sm={12} md={12} xl={12}  container display={"flex"} flexDirection={"column"}>
                            <Logo style={{alignSelf:"center"}} />
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"} alignSelf={"center"}
                                        style={{
                                            color: "white",
                                            marginTop: 5,
                                            fontWeight: "bold",
                                            fontSize: 30,
                                            marginBottom:10,
                                            letterSpacing:0
                                        }}>
                                True Vocation</Typography>
                        </Grid>

                        <Grid item container xs={12} md={12}  xl={12} sm={6}  style={{paddingLeft:0}} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
                            <Facebook id={"social_facebook"} />
                            <GitHub id={"social_github"}/>
                            <Twitter id={"social_twitter"} />
                            <YouTube id={"social_youtube"} />
                        </Grid>
                        <Grid item container xs={12} md={12}  xl={12} sm={6}  display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                            <GooglePlay/>
                            {/*<AppStore/>*/}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container display={"flex"} flexDirection={"column"} xl={2} lg={2} md={2} sm={3}  xs={6} >
                    <Typography variant={"h6"} style={{
                        color:"white",fontWeight:"bold",fontFamily:"Inter",letterSpacing:"-0.125px",marginBottom:15}}>
                        Company
                    </Typography>
                    <Grid container display={"flex"} flexDirection={"column"}>
                        <Link to={"/"} id={"footer_link"}>About Us</Link>
                        <Link to={"/"} id={"footer_link"}>Freebies</Link>
                        <Link to={"/"} id={"footer_link"}>Premium Tools</Link>
                        <Link to={"/"} id={"footer_link"}>Blog</Link>

                    </Grid>
                </Grid>


                <Grid item container display={"flex"} flexDirection={"column"} xl={2} lg={2} md={2} sm={3} xs={6} alignItems={"flex-start"} >
                    <Typography variant={"h6"} style={{
                        color:"white",fontWeight:"bold",fontFamily:"Inter",letterSpacing:"-0.125px",marginBottom:15}}>
                        Resources
                    </Typography>
                    <Grid container display={"flex"} flexDirection={"column"}>
                        <Link to={"/"} id={"footer_link"}>Illustrations</Link>
                        <Link to={"/"} id={"footer_link"}>Bits & Snippets</Link>
                        <Link to={"/"}id={"footer_link"}>Affiliate Program</Link>

                    </Grid>
                </Grid>



                <Grid item container display={"flex"} flexDirection={"column"} xl={2} lg={2} md={2} sm={3} xs={6} >
                    <Typography variant={"h6"} style={{
                        color:"white",fontWeight:"bold",fontFamily:"Inter",letterSpacing:"-0.125px",marginBottom:15}}>
                        Help & Support
                    </Typography>
                    <Grid container display={"flex"} flexDirection={"column"}>
                        <Link to={"/"} id={"footer_link"}>Contact Us</Link>
                        <Link to={"/"} id={"footer_link"}>Knowledge Center</Link>
                        <Link to={"/"} id={"footer_link"}>Custom Development</Link>
                        <Link to={"/"} id={"footer_link"}>Sponsorships</Link>

                    </Grid>
                </Grid>



                <Grid item container display={"flex"} flexDirection={"column"} xl={2} lg={2} md={2} sm={3} xs={6} >
                    <Typography variant={"h6"} style={{
                        color:"white",fontWeight:"bold",fontFamily:"Inter",marginBottom:15}}>
                        Legal
                    </Typography>
                    <Grid container display={"flex"} flexDirection={"column"}>
                        <Link to={"/"} id={"footer_link"}>Terms & Conditions</Link>
                        <Link to={"/"} id={"footer_link"}>Privacy Policy</Link>
                        <Link to={"/"} id={"footer_link"}>Licenses (EULA)</Link>

                    </Grid>
                </Grid>


            </Grid>


            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} >
                <Typography variant={"body1"} textAlign={"center"} style={{
                    textDecoration:"none",
                    fontFamily:"Inter",
                    marginBottom:8,
                    fontSize:15,
                    color:"white"
                }}>
                    All rights reserved. Copyright © 2022 True Vocation.
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;