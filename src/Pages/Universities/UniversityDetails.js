import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Divider, Grid, Tab, Tabs} from "@mui/material";
import CustomAnimatedComponent from "../../Components/motion/CustomAnimatedComponent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {motion} from "framer-motion"
import * as PropTypes from "prop-types";
import UniversityInfoCard from "../../Components/card/UniversityInfoCard";
import {
    CheckCircleOutlineOutlined, DoneOutlined, EmailOutlined,
    GroupAddOutlined,
    GroupsOutlined, LocalPhoneOutlined, LocationOnOutlined,
    MenuBookOutlined,
    SchoolOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import GoogleMaps from "../../Components/googlemap/GoogleMaps";
import {API_BASE} from "../../Constants/Constants";
import {default as axios} from "axios";
import {useParams} from "react-router-dom";
import {RenderIf} from "../../Components/RenderIf";

function TabPanel(props) {
    return null;
}

TabPanel.propTypes = {
    index: PropTypes.number,
    value: PropTypes.number,
    children: PropTypes.node
};

function UniversityDetails(props) {
    let { id } = useParams();
    const [value, setValue] = React.useState(0);
    const [university, setUniversity] = useState({});
    const [image, setImage] = useState('');

    async function fetchUniversity() {
        try {
            const url = new URL(`${API_BASE}/universities/${id}`);
            const response = await axios.get(url.toString());
            if (response.status === 200) {
                setUniversity(response.data);
                fetchLogo(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchLogo(university) {
        try {
            const url = new URL(`${API_BASE}/universities/viewPicture`);
            url.searchParams.set('url', university.logo);
            const response = await axios.get(url.toString());
            if (response.status === 200) {
                const contentType = response.headers['Content-Type']
                setImage(`data:${contentType};base64,` + response.data);
                console.log(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchUniversity();

    },[])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const university = {
    //     name: "International Information Technology University",
    //     image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ddac8642525883.57cf40545c043.jpg",
    //     description: "Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor.",
    //     city: "Almaty",
    //     address: "Manasa street 8"
    // }

    const animationText = {
        visible: custom => ({opacity: 1, x: 0, transition: {delay: custom * 0.2, duration: 0.5}}),
        hidden: {opacity: 0, x: -100},
    }

    const animationTextRightToLeft = {
        visible: custom => ({opacity: 1, x: 0, transition: {delay: custom * 0.2, duration: 0.5}}),
        hidden: {opacity: 0, x: 100},
    }

    const animationButton = {
        visible: custom => ({opacity: 1, y: 0, transition: {delay: custom * 0.2, duration: 0.5}}),
        hidden: {opacity: 0, y: 100},
    }

    const MainImage = {
        visible: custom => ({opacity: 1, y: 0, transition: {delay: custom * 0.2, duration: 5}}),
        hidden: {opacity: 0, y: -100},
    }

    function template({rotate}) {
        return `rotate(${rotate})`
    }


    const animationBottomToTop = {
        visible: custom => ({opacity: 1, y: 0, transition: {delay: custom * 0.2, duration: 0.53}}),
        hidden: {opacity: 0, y: 100},
    }

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{padding: "25px 0 0 0"}}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <Box style={{paddingTop: 40, paddingBottom: 80}}>
            <motion.div initial={"hidden"}
                        whileInView={"visible"}
                        viewport={{amount: 0.3, once: true}}>
                <Grid container display={"flex"} flexDirection={"row"}>
                    <Grid item xs={4} sm={4} md={0.5} lg={0.5} xl={1}/>
                    <Grid
                        item xs={4} sm={4} md={3.5} lg={2.5} xl={2} display={"flex"} justifyContent={"center"} alignItems={"start"}>
                        <CustomAnimatedComponent variants={animationTextRightToLeft} custom={1}>
                            <img src={image} style={{borderRadius: 15}} width={"100%"}/>
                        </CustomAnimatedComponent>
                    </Grid>

                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} display={"flex"} flexDirection={"column"} style={{padding: "20px 20px 50px 20px"}}>
                        <CustomAnimatedComponent variants={animationText} custom={1}>
                            <Typography variant={"h2"} fontFamily={"Inter"} fontWeight={"bold"}
                                        style={{color: "#2d3e4a", marginBottom: 0}}>{university.name}</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationText} custom={2}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{color: "rgb(103, 119, 136)", marginTop: 20, fontSize: 20}}>{university.description}</Typography>
                        </CustomAnimatedComponent>
                        <Grid container flexDirection={"row"} xs={12}
                              style={{marginTop: 30}}>
                            <CustomAnimatedComponent variants={animationButton} custom={3}>
                                <Button size={"large"} style={{marginRight:20, marginBottom:15}} variant={"outlined"} id={"primary_button_outlined"}>Purchase
                                    now</Button>
                            </CustomAnimatedComponent>
                            <CustomAnimatedComponent variants={animationButton} custom={4}>
                                <Button size={"large"} variant={"contained"} id={"primary_button"}>View
                                    documentation</Button>
                            </CustomAnimatedComponent>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={0.5} lg={1} xl={1}/>
                </Grid>
            </motion.div>

            <Grid container style={{marginTop:20}}>
                <Grid item xs={0.5} sm={0.5} md={0.5} lg={1}  xl={1}/>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="University" style={{textTransform: "none"}} {...a11yProps(0)} />
                    <Tab label="Photos" style={{textTransform: "none"}} {...a11yProps(1)} />
                    <Tab label="Specialties" style={{textTransform: "none"}} {...a11yProps(2)} />
                    <Tab label="Professions" style={{textTransform: "none"}} {...a11yProps(3)} />
                </Tabs>
            </Grid>

            <Grid container>
                <Grid item xs={0.5} sm={0.5} md={0.5} lg={1}  xl={1}/>
                <Grid xs={11} sm={11} md={11} lg={10} xl={10} container  display={"flex"} flexDirection={"column"}>
                    <TabPanel value={value} index={0}>
                        <Grid item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                            <Grid item xs={12} sm={6} md={6} lg={6}  xl={6} style={{marginBottom:10}}>
                                <Typography variant={"h4"} fontFamily={"Inter"} fontWeight={"bold"} alignSelf={"center"}
                                            style={{color: "#2d3e4a", marginBottom: 0}}>About University</Typography>
                            </Grid>

                            <Grid container item xs={12} sm={"auto"} md={"auto"} lg={"auto"} xl={"auto"} display={"flex"} flexDirection={"row"}>
                                    <Grid container item xs={"auto"} style={{marginRight:10}}>
                                        <DoneOutlined fontSize={"medium"} style={{color:"rgb(0,224,140)"}}/>
                                        <Typography variant={"h4"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", marginBottom: 0,fontSize:20}}>{university.status}</Typography>
                                    </Grid>
                                <RenderIf isTrue={university.dormitory}>
                                <Grid container item xs={"auto"} style={{marginRight:10}}>
                                    <DoneOutlined fontSize={"medium"} style={{color:"rgb(0,224,140)"}}/>
                                    <Typography variant={"h4"} fontFamily={"Inter"}
                                                style={{color: "#2d3e4a", marginBottom: 0,fontSize:20}}>Dormitory</Typography>
                                </Grid>
                                </RenderIf>
                                <RenderIf isTrue={university.military}>
                                <Grid container item xs={"auto"} style={{marginRight:10}}>
                                    <DoneOutlined fontSize={"medium"} style={{color:"rgb(0,224,140)"}}/>
                                    <Typography variant={"h4"} fontFamily={"Inter"}
                                                style={{color: "#2d3e4a", marginBottom: 0,fontSize:20}}>Military</Typography>
                                </Grid>
                                </RenderIf>
                            </Grid>
                        </Grid>

                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{color: "rgb(103, 119, 136)", marginTop: 20, fontSize: 20}}>
                            De Montfort University Leicester (DMU) is a public university in the city of Leicester,
                            England. It was established in accordance with the Further and Higher Education Act in 1992
                            as a degree awarding body. The name De Montfort University was taken from Simon de Montfort,
                            a 13th-century Earl of Leicester credited with establishing the first Parliament of England
                            in 1265.

                            De Montfort University has approximately 27,000 full and part-time students, 3,240 staff and
                            an annual turnover in the region of £168 million.[1] The university is organised into four
                            faculties: Art, Design, and Humanities (ADH); Business and Law (BAL); Health and Life
                            Sciences (H&LS); and Computing, Engineering and Media (CEM). It is a Sustainable Development
                            Hub, focusing on Peace, Justice and Strong Institutions, an initiative by the United Nations
                            launched in 2018. The Department of Education awarded university a Gold rating in the 2017
                            Teaching Excellence Framework. It is a member of the Association of Commonwealth
                            Universities.
                        </Typography>

                       <Grid item container display={"flex"} flexDirection={"row"} style={{marginTop:20, marginBottom:35}}>
                           <CustomAnimatedComponent style={{
                               borderLeft:"5px solid transparent",
                               borderTopLeftRadius:15,
                               borderBottomLeftRadius:15,
                               marginBottom:15
                           }} whileHover={{borderLeft:"5px solid rgb(253,215,23)", borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
                           <UniversityInfoCard backColor={"rgb(253,243,184)"} text={{text:"Programs", number:44}} icon={<SchoolOutlined fontSize={"large"} style={{color:"rgb(253,215,23)"}} />} />
                           </CustomAnimatedComponent>
                           <CustomAnimatedComponent style={{
                               borderLeft:"5px solid transparent",
                               borderTopLeftRadius:15,
                               borderBottomLeftRadius:15,
                               marginBottom:15
                           }} whileHover={{borderLeft:"5px solid rgb(0,184,254)", borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
                           <UniversityInfoCard backColor={"rgb(191,237,254)"} text={{text:"Faculties", number:14}} icon={<MenuBookOutlined fontSize={"large"} style={{color:"rgb(0,184,254)"}} />} />
                           </CustomAnimatedComponent>
                           <CustomAnimatedComponent style={{
                               borderLeft:"5px solid transparent",
                               borderTopLeftRadius:15,
                               borderBottomLeftRadius:15,
                               marginBottom:15
                           }} whileHover={{borderLeft:"5px solid rgb(166,0,246)", borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
                               <UniversityInfoCard backColor={"rgb(233,191,252)"} text={{text:"Professions", number:190}} icon={<WorkOutlineOutlined fontSize={"large"} style={{color:"rgb(166,0,246)"}} />} />
                               </CustomAnimatedComponent>
                                   {/*<UniversityInfoCard backColor={"rgb(191,253,222)"} text={{text:"Professions", number:193}} icon={<GroupAddOutlined fontSize={"large"} style={{color:"rgb(0,253,123)"}} />} />*/}
                                   <CustomAnimatedComponent style={{
                                       borderLeft:"5px solid transparent",
                                       borderTopLeftRadius:15,
                                       borderBottomLeftRadius:15,
                                       marginBottom:15
                                   }} whileHover={{borderLeft:"5px solid rgb(253,110,1)", borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
                           <UniversityInfoCard backColor={"rgb(253,218,191)"} text={{text:"Specialties", number:60}} icon={<GroupAddOutlined fontSize={"large"} style={{color:"rgb(253,110,1)"}} />} />
                                   </CustomAnimatedComponent>
                                   </Grid>

                        <Grid item xs={12} sm={12} md={8} lg={7} xl={6}>
                            <Typography variant={"h4"} fontFamily={"Inter"} fontWeight={"bold"} alignSelf={"center"}
                                        style={{color: "#2d3e4a", marginBottom: 0}}>Contacts</Typography>
                            <Paper variant={"elevation"} elevation={0} style={{
                                borderRadius: 15,
                                boxShadow: "0 3px 16px 0 rgb(114 114 114 / 30%)",
                                padding: "15px 25px 15px 20px",
                                marginTop:20,
                                marginBottom:35,
                                paddingTop:15,
                                paddingLeft:20
                            }}
                                   square={true}>
                                <Grid container display={"flex"} flexDirection={"column"}>
                                    <Grid container item style={{marginBottom:10}}>
                                        <LocalPhoneOutlined fontSize={"large"} style={{color:"rgb(103, 119, 136)", marginRight:5}}/>
                                        <Typography variant={"p"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", marginBottom: 0,fontSize:21}}>+7 777 123 33 55</Typography>
                                    </Grid>
                                    <Grid container item style={{marginBottom:10}}>
                                        <EmailOutlined fontSize={"large"} style={{color:"rgb(103, 119, 136)", marginRight:5}}/>
                                        <Typography variant={"p"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", marginBottom: 0,fontSize:21}}>montfort@gmail.com</Typography>
                                    </Grid>
                                    <Grid container item style={{marginBottom:10}}>
                                        <LocationOnOutlined fontSize={"large"} style={{color:"rgb(103, 119, 136)", marginRight:5}}/>
                                        <Typography variant={"p"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", marginBottom: 0,fontSize:20}}>Al-Farabi Avenue, 116/1 D1A, Almaty 050044</Typography>
                                    </Grid>

                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={12} md={8} lg={7} xl={6} style={{marginTop:15}}>
                            <GoogleMaps/>
                        </Grid>

                    </TabPanel>

                    <TabPanel value={value} index={1}>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                    </TabPanel>
                </Grid>

            </Grid>
        </Box>
    );
}

export default UniversityDetails;