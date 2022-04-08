import React from 'react';
import Box from "@mui/material/Box";
import {Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ReactComponent as Logo} from '../../images/Footer-Logo.svg';
import {Facebook, GitHub, Twitter, YouTube} from "@mui/icons-material";
import {Link} from "react-router-dom";
import '../links/links.scss'

function Footer(props) {
    return (
        <Box display={"flex"} flexDirection={"column"} sx={{backgroundColor:"#0c0e30",paddingBottom:2,paddingTop:8}}>
            <Container maxWidth={"lg"} style={{paddingLeft:0,paddingRight:0,display:"flex",flexDirection:"row",alignItems:"start", marginBottom:80}}  >

                <Grid item xs={2} container display={"flex"} flexDirection={"column"}>
                    <Logo style={{alignSelf:"center"}} />
                    <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                style={{
                                    color: "white",
                                    marginTop: 5,
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    marginBottom:10,
                    }}>
                        True Vocation</Typography>
                    <Grid item container xs={12} style={{paddingLeft:0}} display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"}>
                        <Facebook style={{color:"white"}} />
                        <Twitter style={{color:"white"}} />
                        <GitHub style={{color:"white"}} />
                        <YouTube style={{color:"white"}} />
                    </Grid>
                </Grid>

                <Grid item xs={2}/>
                <Grid item container display={"flex"} flexDirection={"column"} xs={2} style={{paddingLeft:40}} >
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


                <Grid item container display={"flex"} flexDirection={"column"} xs={2} style={{paddingLeft:40}}  alignItems={"flex-start"}>
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



                <Grid item container display={"flex"} flexDirection={"column"} xs={2} style={{paddingLeft:40}}>
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



                <Grid item container display={"flex"} flexDirection={"column"} xs={2} style={{paddingLeft:40}}>
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


            </Container>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
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