import React from 'react';
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

function TabPanel(props) {
    return null;
}

TabPanel.propTypes = {
    index: PropTypes.number,
    value: PropTypes.number,
    children: PropTypes.node
};

function UniversityDetails(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const university = {
        name: "International Information Technology University",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ddac8642525883.57cf40545c043.jpg",
        description: "Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor.",
        city: "Almaty",
        address: "Manasa street 8"
    }

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
        <Box style={{paddingTop: 80, paddingBottom: 80}}>
            <motion.div initial={"hidden"}
                        whileInView={"visible"}
                        viewport={{amount: 0.3, once: true}}>
                <Grid container display={"flex"} flexDirection={"row"}>
                    <Grid item xs={1}/>
                    <Grid item xs={6} display={"flex"} flexDirection={"column"} style={{padding: "20px 0 50px 20px"}}>
                        <CustomAnimatedComponent variants={animationText} custom={1}>
                            <Typography variant={"h2"} fontFamily={"Inter"} fontWeight={"bold"}
                                        style={{color: "#2d3e4a", marginBottom: 0}}>De Montfort University</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationText} custom={2}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{color: "rgb(103, 119, 136)", marginTop: 20, fontSize: 20}}>De Montfort
                                University Leicester (DMU) is a public university in the city of Leicester, England. It
                                was established in accordance with the Further and Higher Education Act in 1992 as a
                                degree awarding body. The name De Montfort University was taken from Simon de Montfort,
                                a 13th-century Earl of Leicester credited with establishing the first Parliament of
                                England in 1265.</Typography>
                        </CustomAnimatedComponent>
                        <Grid container flexDirection={"row"} xs={6}
                              style={{marginTop: 40}}>
                            <CustomAnimatedComponent variants={animationButton} custom={3}>
                                <Button size={"large"} style={{marginRight:20}} variant={"outlined"} id={"primary_button_outlined"}>Purchase
                                    now</Button>
                            </CustomAnimatedComponent>
                            <CustomAnimatedComponent variants={animationButton} custom={4}>
                                <Button size={"large"} variant={"contained"} id={"primary_button"}>View
                                    documentation</Button>
                            </CustomAnimatedComponent>
                        </Grid>

                    </Grid>
                    <Grid
                        style={{backgroundImage: "url('data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='517' preserveAspectRatio='none' viewBox='0 0 1440 517'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1000%26quot%3b)' fill='none'%3e%3crect width='1440' height='517' x='0' y='0' fill='rgba(190%2c 222%2c 255%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c550.31C106.52%2c554.043%2c210.283%2c523.977%2c303.333%2c471.996C400.651%2c417.632%2c511.232%2c354.668%2c542.01%2c247.528C572.489%2c141.429%2c479.983%2c42.319%2c457.831%2c-65.826C437.452%2c-165.315%2c467.524%2c-273.311%2c417.251%2c-361.55C362.181%2c-458.209%2c276.194%2c-545.992%2c168.461%2c-573.726C61.612%2c-601.232%2c-53.587%2c-562.784%2c-148.96%2c-507.31C-233.079%2c-458.382%2c-262.125%2c-355.81%2c-328.515%2c-284.66C-398.467%2c-209.692%2c-517.477%2c-176.554%2c-548.714%2c-78.893C-580.706%2c21.128%2c-537.399%2c130.015%2c-491.336%2c224.386C-446.072%2c317.121%2c-375.964%2c394.161%2c-289.971%2c451.204C-203.09%2c508.836%2c-104.194%2c546.659%2c0%2c550.31' fill='%2365b1ff'%3e%3c/path%3e%3cpath d='M1440 1171.13C1560.2930000000001 1168.501 1638.329 1048.1399999999999 1738.675 981.7470000000001 1837.371 916.446 1972.534 890.241 2024.924 784.126 2077.526 677.582 2017.463 553.748 2008.476 435.266 1998.714 306.574 2058.773 151.421 1969.837 57.894000000000005 1880.246-36.322 1717.998 31.581000000000017 1592.459-2.227999999999952 1471.046-34.924999999999955 1373.048-150.75800000000004 1248.124-136.46799999999996 1118.798-121.67399999999998 995.677-37.72900000000004 928.441 73.731 863.985 180.58300000000003 910.147 315.03200000000004 900.709 439.462 892.053 553.5889999999999 831.133 669.3009999999999 875.257 774.909 919.692 881.261 1038.46 928.7909999999999 1132.815 994.99 1231.437 1064.183 1319.555 1173.763 1440 1171.13' fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1000'%3e%3crect width='1440' height='517' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e')"}}
                        item xs={5} display={"flex"} justifyContent={"center"} alignItems={"start"}
                    >
                        <CustomAnimatedComponent variants={animationTextRightToLeft} custom={1}>
                            <img src={university.image} style={{borderRadius: 15}} width={window.innerWidth * 0.25}/>
                        </CustomAnimatedComponent>
                    </Grid>
                </Grid>
            </motion.div>

            <Grid container>
                <Grid item xs={1}/>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="University" style={{textTransform: "none"}} {...a11yProps(0)} />
                    <Tab label="Photos" style={{textTransform: "none"}} {...a11yProps(1)} />
                    <Tab label="Specialties" style={{textTransform: "none"}} {...a11yProps(2)} />
                    <Tab label="Professions" style={{textTransform: "none"}} {...a11yProps(3)} />
                </Tabs>

            </Grid>
            <Grid container>
                <Grid item xs={1}/>
                <Grid xs={10} container  display={"flex"} flexDirection={"column"}>
                    <TabPanel value={value} index={0}>
                        <Grid item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                            <Typography variant={"h4"} fontFamily={"Inter"} fontWeight={"bold"} alignSelf={"center"}
                                        style={{color: "#2d3e4a", marginBottom: 0}}>About University</Typography>
                            <Grid container item xs={6} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                                <Grid container item xs={2} style={{marginRight:3}}>
                                    <DoneOutlined fontSize={"medium"} style={{color:"rgb(0,224,140)"}}/>
                                    <Typography variant={"h4"} fontFamily={"Inter"}
                                                style={{color: "#2d3e4a", marginBottom: 0,fontSize:20}}>State</Typography>
                                </Grid>
                                <Grid container item xs={3} style={{marginRight:3}}>
                                    <DoneOutlined fontSize={"medium"} style={{color:"rgb(0,224,140)"}}/>
                                    <Typography variant={"h4"} fontFamily={"Inter"}
                                                style={{color: "#2d3e4a", marginBottom: 0,fontSize:20}}>Dormitory</Typography>
                                </Grid>
                                <Grid container item xs={2} style={{marginRight:3}}>
                                    <DoneOutlined fontSize={"medium"} style={{color:"rgb(0,224,140)"}}/>
                                    <Typography variant={"h4"} fontFamily={"Inter"}
                                                style={{color: "#2d3e4a", marginBottom: 0,fontSize:20}}>Military</Typography>
                                </Grid>

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
                           <CustomAnimatedComponent style={{borderLeft:"5px solid transparent",borderTopLeftRadius:15,borderBottomLeftRadius:15}} whileHover={{borderLeft:"5px solid rgb(253,215,23)", borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
                           <UniversityInfoCard backColor={"rgb(253,243,184)"} text={{text:"Programs", number:44}} icon={<SchoolOutlined fontSize={"large"} style={{color:"rgb(253,215,23)"}} />} />
                           </CustomAnimatedComponent>
                           <CustomAnimatedComponent style={{borderLeft:"5px solid transparent",borderTopLeftRadius:15,borderBottomLeftRadius:15}} whileHover={{borderLeft:"5px solid rgb(0,184,254)", borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
                           <UniversityInfoCard backColor={"rgb(191,237,254)"} text={{text:"Faculties", number:14}} icon={<MenuBookOutlined fontSize={"large"} style={{color:"rgb(0,184,254)"}} />} />
                           </CustomAnimatedComponent>
                           <CustomAnimatedComponent style={{borderLeft:"5px solid transparent",borderTopLeftRadius:15,borderBottomLeftRadius:15}} whileHover={{borderLeft:"5px solid rgb(166,0,246)", borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
                               <UniversityInfoCard backColor={"rgb(233,191,252)"} text={{text:"Professions", number:190}} icon={<WorkOutlineOutlined fontSize={"large"} style={{color:"rgb(166,0,246)"}} />} />
                               </CustomAnimatedComponent>
                                   {/*<UniversityInfoCard backColor={"rgb(191,253,222)"} text={{text:"Professions", number:193}} icon={<GroupAddOutlined fontSize={"large"} style={{color:"rgb(0,253,123)"}} />} />*/}
                                   <CustomAnimatedComponent style={{borderLeft:"5px solid transparent",borderTopLeftRadius:15,borderBottomLeftRadius:15}} whileHover={{borderLeft:"5px solid rgb(253,110,1)", borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
                           <UniversityInfoCard backColor={"rgb(253,218,191)"} text={{text:"Specialties", number:60}} icon={<GroupAddOutlined fontSize={"large"} style={{color:"rgb(253,110,1)"}} />} />
                                   </CustomAnimatedComponent>
                                   </Grid>

                        <Grid item xs={6}>
                            <Typography variant={"h4"} fontFamily={"Inter"} fontWeight={"bold"} alignSelf={"center"}
                                        style={{color: "#2d3e4a", marginBottom: 0}}>Contacts</Typography>
                            <Paper variant={"elevation"} elevation={0} style={{
                                borderRadius: 15,
                                boxShadow: "rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px",
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