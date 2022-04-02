import useAuth from "../../AuthConfig/useAuth";
import Box from "@mui/material/Box";
import {Divider, Grid} from "@mui/material";
import {ReactComponent as Main} from '../../images/undraw_job_hunt_re_q203.svg'
import {ReactComponent as Logo} from '../../images/113-atom (2).svg'
import {ReactComponent as Logo2} from '../../images/1541-education-mathematics-abacus.svg'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {motion} from "framer-motion"
import CustomAnimatedComponent from "../../Components/motion/CustomAnimatedComponent";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import {AccountBalance, Book, CommentBank, Group, Groups, MenuBook, School} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";

const Home = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const animationText = {
        visible: custom => ({opacity: 1, x: 0, transition: {delay: custom * 0.2, duration:0.5}}),
        hidden: {opacity: 0, x: -100},
    }

    const animationTextRightToLeft = {
        visible: custom => ({opacity: 1, x: 0, transition: {delay: custom * 0.2, duration:0.5}}),
        hidden: {opacity: 0, x: 100},
    }

    const animationButton = {
        visible: custom => ({opacity: 1, y: 0, transition: {delay: custom * 0.2, duration:0.5}}),
        hidden: {opacity: 0, y: 100},
    }

    const MainImage = {
        visible: custom => ({opacity: 1, y: 0, transition: {delay: custom * 0.2, duration:5}}),
        hidden: {opacity: 0, y: -100},
    }

    function template({rotate}) {
        return `rotate(${rotate})`
    }


    const animationBottomToTop = {
        visible: custom => ({opacity: 1, y: 0, transition: {delay: custom * 0.2, duration:0.53}}),
        hidden: {opacity: 0, y: 100},
    }

    const animationBottomToTopThenHover = {
        visible: {y: 0, transition: {duration:0.53}},
        hidden: {y: 20},
    }


    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <motion.div
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{amount: 0.3, once: true}}>
                <Grid container item xs={12} style={{backgroundColor: "#F7F9FF"}}>
                    <Grid item xs={1}/>
                    <Grid item xs={5}>
                        <CustomAnimatedComponent variants={animationText} custom={1}>
                            <Typography variant={"h2"} fontFamily={"Inter"} fontWeight={"bold"}
                                        style={{color: "#2d3e4a", marginTop: 140, marginBottom: 0}}>Learn new skills,
                                gain more experience</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationText} custom={2}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{color: "rgb(103, 119, 136)", marginTop: 20}}>Our mission is to spread
                                education that is easy accessible and everyone can learn.</Typography>
                        </CustomAnimatedComponent>
                        <Grid container justifyContent={"space-between"} flexDirection={"row"} xs={7}
                              style={{marginTop: 40}}>
                            <CustomAnimatedComponent variants={animationButton} custom={3}>
                                <Button size={"large"} variant={"outlined"} id={"primary_button_outlined"}>Purchase
                                    now</Button>
                            </CustomAnimatedComponent>
                            <CustomAnimatedComponent variants={animationButton} custom={4}>
                                <Button size={"large"} variant={"contained"} id={"primary_button"}>View
                                    documentation</Button>
                            </CustomAnimatedComponent>
                        </Grid>

                    </Grid>
                    <Grid container justifyContent={"center"} item xs={6}
                          style={{padding: 15}}
                    >
                        <CustomAnimatedComponent transformTemplate={template}
                                                 animate={{rotate: 360,opacity:1}}
                                                 transition={{duration:1}}
                                                 style={{rotate: 0, opacity:0}} custom={1}>
                            <Main/>
                        </CustomAnimatedComponent>
                    </Grid>
                </Grid>
                <Divider/>
            </motion.div>


            <motion.div
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{amount: 0.3, once: true}}
            >
                <Grid container item xs={12} style={{
                    paddingTop: 40,
                    paddingBottom: 50,
                    paddingLeft: 15,
                    paddingRight: 15
                }} flexDirection={"column"}>
                    <Grid container item justifyContent={"center"} flexDirection={"column"} alignContent={"center"}>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={1}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "#FFC107", marginTop: 20, fontSize: 17, fontWeight:"bold"}}>NUMBERS</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={2}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "#2d3e4a", marginTop: 5, fontWeight: "bold", fontSize: 30}}>Our
                                global class is open for all</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={3}>
                            <Typography variant={"h6"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "rgb(103, 119, 136)", marginTop: 5}}>The best way to learn is by
                                using skills.<br/> That's why every class has a project that lets you practice and get
                                feedback.</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={4}>
                            <Grid container item justifyContent={"center"} style={{marginTop: 15}}>
                                <Button size={"large"} variant={"outlined"} id={"primary_button_outlined"}>Purchase
                                    now</Button>
                                <Button size={"large"} variant={"contained"} id={"primary_button"} style={{marginLeft: 15}}>View
                                    documentation</Button>
                            </Grid>
                        </CustomAnimatedComponent>



                    </Grid>

                    <Grid container item justifyContent={"center"} xs={12}>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={5}>
                            <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                <Paper variant={"outlined"} style={{padding:32,borderRadius:8, border:"1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"} width={230}>
                                        <Avatar variant={"circular"} style={{marginBottom:20,width:50,height:50,backgroundColor:"#0095FF"}}>
                                            <Groups/>
                                        </Avatar>
                                        <Typography variant={"h4"} fontFamily={"Inter"}
                                                    style={{color: "#0095FF", fontWeight: "bold", fontSize: 30, marginBottom:8}}>800+ </Typography>
                                        <Typography variant={"h6"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", fontSize: 20,marginBottom:10}}>Expert instructors</Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)",fontSize:15}}>Expert instructors to make sure courses are well.</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={6}>
                            <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                <Paper variant={"outlined"} style={{padding:32,borderRadius:8, border:"1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"} width={230}>
                                        <Avatar variant={"circular"} style={{marginBottom:20,width:50,height:50,backgroundColor:"#0095FF"}}>
                                            <School/>
                                        </Avatar>
                                        <Typography variant={"h4"} fontFamily={"Inter"}
                                                    style={{color: "#0095FF", fontWeight: "bold", fontSize: 30, marginBottom:8}}>100K+ </Typography>
                                        <Typography variant={"h6"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", fontSize: 20,marginBottom:10}}>Active students
                                        </Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)",fontSize:15}}>100K+ Active students arround the world.</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={7}>
                            <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                <Paper variant={"outlined"} style={{padding:32,borderRadius:8, border:"1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"} width={230}>
                                        <Avatar variant={"circular"} style={{marginBottom:20,width:50,height:50,backgroundColor:"#0095FF"}}>
                                            <MenuBook/>
                                        </Avatar>
                                        <Typography variant={"h4"} fontFamily={"Inter"}
                                                    style={{color: "#0095FF", fontWeight: "bold", fontSize: 30, marginBottom:8}}>400+ </Typography>
                                        <Typography variant={"h6"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", fontSize: 20,marginBottom:10}}>Free resources</Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)",fontSize:15}}>Free resources for all students arround the world.</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={8}>
                            <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                <Paper variant={"outlined"} style={{padding:32,borderRadius:8, border:"1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"} width={230}>
                                        <Avatar variant={"circular"} style={{marginBottom:20,width:50,height:50,backgroundColor:"#0095FF"}}>
                                            <AccountBalance/>
                                        </Avatar>
                                        <Typography variant={"h4"} fontFamily={"Inter"}
                                                    style={{color: "#0095FF", fontWeight: "bold", fontSize: 30, marginBottom:8}}>1000+ </Typography>
                                        <Typography variant={"h6"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", fontSize: 20,marginBottom:10}}>Online courses</Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)",fontSize:15}}>Choose from over 1000+ online video courses.</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </CustomAnimatedComponent>
                    </Grid>
                </Grid>
            </motion.div>



            <motion.div
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{amount: 0.3, once: true}}
            >
                <Grid container item xs={12} style={{
                    backgroundColor: "#F7F9FF",
                    paddingTop: 40,
                    paddingBottom: 50,
                    paddingLeft: 15,
                    paddingRight: 15
                }} flexDirection={"column"}>
                    <Grid container item justifyContent={"center"} flexDirection={"column"} alignContent={"center"}>
                        <CustomAnimatedComponent variants={animationText} custom={1}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "#FFC107", marginTop: 20, fontSize: 17,fontWeight:"bold"}}>CATEGORIES</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationText} custom={2}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "#2d3e4a", marginTop: 5, fontWeight: "bold", fontSize: 30}}>Choose your course by categories</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationTextRightToLeft} custom={3}>
                            <Typography variant={"h6"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "rgb(103, 119, 136)", marginTop: 5}}>The best way to learn is by
                                using skills.<br/> Browse the available course categories, choose your favourite one and start learning.</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationTextRightToLeft} custom={4}>
                            <Grid container item justifyContent={"center"} style={{marginTop: 15}}>
                                <Button size={"large"} variant={"outlined"} id={"primary_button_outlined"}>Purchase
                                    now</Button>
                                <Button size={"large"} variant={"contained"} id={"primary_button"} style={{marginLeft: 15}}>View
                                    documentation</Button>
                            </Grid>
                        </CustomAnimatedComponent>



                    </Grid>

                    <Grid container item justifyContent={"center"} xs={12}>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={5}>
                            <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                <CustomAnimatedComponent whileHover={{y:-10}}>
                                    <Link to={"/sign-in"} style={{textDecoration:"none"}}>
                                        <Paper variant={"elevation"} elevation={0} style={{padding:32,borderRadius:8,boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px"}}
                                               square={true}>
                                            <Box flexDirection={"column"} width={150}>
                                                <Grid container flexDirection={"row"} justifyContent={"center"}>
                                                    <Logo style={{alignSelf:"center",width:120}}/>
                                                </Grid>
                                                <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                                            style={{color: "rgb(45, 62, 74)", marginTop: 20, fontSize: 20,fontWeight:"bold"}}>Physics</Typography>
                                            </Box>
                                        </Paper>
                                    </Link>

                                </CustomAnimatedComponent>
                            </Grid>
                        </CustomAnimatedComponent>
                        {/*<CustomAnimatedComponent variants={animationBottomToTop} custom={6}>*/}
                        {/*    <Grid item style={{paddingLeft: 32, paddingTop: 32}}>*/}
                        {/*        <CustomAnimatedComponent whileHover={{y:-10}}>*/}
                        {/*        <Paper variant={"elevation"} elevation={0} style={{padding:32,borderRadius:8,boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px"}}*/}
                        {/*               square={true}>*/}
                        {/*            <Box flexDirection={"column"} width={230}>*/}
                        {/*                <Avatar variant={"circular"} style={{marginBottom:20,width:50,height:50,backgroundColor:"#0095FF"}}>*/}
                        {/*                    <School/>*/}
                        {/*                </Avatar>*/}
                        {/*                <Typography variant={"h4"} fontFamily={"Inter"}*/}
                        {/*                            style={{color: "#0095FF", fontWeight: "bold", fontSize: 30, marginBottom:8}}>100K+ </Typography>*/}
                        {/*                <Typography variant={"h6"} fontFamily={"Inter"}*/}
                        {/*                            style={{color: "#2d3e4a", fontSize: 20,marginBottom:10}}>Active students*/}
                        {/*                </Typography>*/}
                        {/*                <Typography variant={"body1"} fontFamily={"Inter"}*/}
                        {/*                            style={{color: "rgb(103, 119, 136)",fontSize:15}}>100K+ Active students arround the world.</Typography>*/}
                        {/*            </Box>*/}
                        {/*        </Paper>*/}
                        {/*        </CustomAnimatedComponent>*/}
                        {/*    </Grid>*/}
                        {/*</CustomAnimatedComponent>*/}
                        {/*<CustomAnimatedComponent variants={animationBottomToTop} custom={7}>*/}
                        {/*    <Grid item style={{paddingLeft: 32, paddingTop: 32}}>*/}
                        {/*        <CustomAnimatedComponent whileHover={{y:-10}}>*/}
                        {/*        <Paper variant={"elevation"} elevation={0} style={{padding:32,borderRadius:8,boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px"}}*/}
                        {/*               square={true}>*/}
                        {/*            <Box flexDirection={"column"} width={230}>*/}
                        {/*                <Avatar variant={"circular"} style={{marginBottom:20,width:50,height:50,backgroundColor:"#0095FF"}}>*/}
                        {/*                    <MenuBook/>*/}
                        {/*                </Avatar>*/}
                        {/*                <Typography variant={"h4"} fontFamily={"Inter"}*/}
                        {/*                            style={{color: "#0095FF", fontWeight: "bold", fontSize: 30, marginBottom:8}}>400+ </Typography>*/}
                        {/*                <Typography variant={"h6"} fontFamily={"Inter"}*/}
                        {/*                            style={{color: "#2d3e4a", fontSize: 20,marginBottom:10}}>Free resources</Typography>*/}
                        {/*                <Typography variant={"body1"} fontFamily={"Inter"}*/}
                        {/*                            style={{color: "rgb(103, 119, 136)",fontSize:15}}>Free resources for all students arround the world.</Typography>*/}
                        {/*            </Box>*/}
                        {/*        </Paper>*/}
                        {/*        </CustomAnimatedComponent>*/}
                        {/*    </Grid>*/}
                        {/*</CustomAnimatedComponent>*/}
                        {/*<CustomAnimatedComponent variants={animationBottomToTop} custom={8}>*/}
                        {/*    <Grid item style={{paddingLeft: 32, paddingTop: 32}}>*/}
                        {/*        <CustomAnimatedComponent whileHover={{y:-10}}>*/}
                        {/*        <Paper variant={"elevation"} elevation={0} style={{padding:32,borderRadius:8,boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px"}}*/}
                        {/*               square={true}>*/}
                        {/*            <Box flexDirection={"column"} width={230}>*/}
                        {/*                <Avatar variant={"circular"} style={{marginBottom:20,width:50,height:50,backgroundColor:"#0095FF"}}>*/}
                        {/*                    <AccountBalance/>*/}
                        {/*                </Avatar>*/}
                        {/*                <Typography variant={"h4"} fontFamily={"Inter"}*/}
                        {/*                            style={{color: "#0095FF", fontWeight: "bold", fontSize: 30, marginBottom:8}}>1000+ </Typography>*/}
                        {/*                <Typography variant={"h6"} fontFamily={"Inter"}*/}
                        {/*                            style={{color: "#2d3e4a", fontSize: 20,marginBottom:10}}>Online courses</Typography>*/}
                        {/*                <Typography variant={"body1"} fontFamily={"Inter"}*/}
                        {/*                            style={{color: "rgb(103, 119, 136)",fontSize:15}}>Choose from over 1000+ online video courses.</Typography>*/}
                        {/*            </Box>*/}
                        {/*        </Paper>*/}
                        {/*        </CustomAnimatedComponent>*/}
                        {/*    </Grid>*/}
                        {/*</CustomAnimatedComponent>*/}
                    </Grid>
                </Grid>
            </motion.div>

            <Box sx={{height:20,width:"100%",alignSelf:"center",backgroundColor: "#F7F9FF"}} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Grid xs={8} alignSelf={"center"}>
                    <Divider style={{height:5,borderColor:"rgba(0, 0, 0, 0.12)"}}  />
                </Grid>
            </Box>


            <motion.div
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{amount: 0.3, once: true}}
            >
                <Grid container item xs={12} style={{
                    backgroundColor: "#F7F9FF",
                    paddingTop: 40,
                    paddingBottom: 50,
                    paddingLeft: 15,
                    paddingRight: 15
                }} flexDirection={"column"}>
                    <Grid container item justifyContent={"center"} flexDirection={"column"} alignContent={"center"}>
                        <CustomAnimatedComponent variants={animationText} custom={1}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "#FFC107", marginTop: 20, fontSize: 17,fontWeight:"bold"}}>CATEGORIES</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationText} custom={2}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "#2d3e4a", marginTop: 5, fontWeight: "bold", fontSize: 30}}>Choose your course by categories</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationTextRightToLeft} custom={3}>
                            <Typography variant={"h6"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "rgb(103, 119, 136)", marginTop: 5}}>The best way to learn is by
                                using skills.<br/> Browse the available course categories, choose your favourite one and start learning.</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationTextRightToLeft} custom={4}>
                            <Grid container item justifyContent={"center"} style={{marginTop: 15}}>
                                <Button size={"large"} variant={"outlined"} id={"primary_button_outlined"}>Purchase
                                    now</Button>
                                <Button size={"large"} variant={"contained"} id={"primary_button"} style={{marginLeft: 15}}>View
                                    documentation</Button>
                            </Grid>
                        </CustomAnimatedComponent>



                    </Grid>

                    <Grid container item justifyContent={"center"} xs={12}>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={5}>
                            <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                <CustomAnimatedComponent whileHover={{y:-10}}>
                                    <Link to={"/sign-in"} style={{textDecoration:"none"}}>
                                        <Paper variant={"elevation"} elevation={0} style={{padding:32,borderRadius:8,boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px"}}
                                               square={true}>
                                            <Box flexDirection={"column"} width={150}>
                                                <Grid container flexDirection={"row"} justifyContent={"center"}>
                                                    <Logo style={{alignSelf:"center",width:120}}/>
                                                </Grid>
                                                <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                                            style={{color: "rgb(45, 62, 74)", marginTop: 20, fontSize: 20,fontWeight:"bold"}}>Physics</Typography>
                                            </Box>
                                        </Paper>
                                    </Link>

                                </CustomAnimatedComponent>
                            </Grid>
                        </CustomAnimatedComponent>
                    </Grid>
                </Grid>
            </motion.div>

        </Box>
    )
}

export default Home;