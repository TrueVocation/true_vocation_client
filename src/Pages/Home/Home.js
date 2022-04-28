import useAuth from "../../AuthConfig/useAuth";
import Box from "@mui/material/Box";
import {Divider, Grid, TextField} from "@mui/material";
import {ReactComponent as Main} from '../../images/undraw_job_hunt_re_q203.svg'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {motion} from "framer-motion"
import CustomAnimatedComponent from "../../Components/motion/CustomAnimatedComponent";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import {AccountBalance, ArrowBackIos, ArrowForwardIos, Groups, MenuBook, School} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import CountUp from "react-countup";
import ReactVisibilitySensor from "react-visibility-sensor";
import {useForm} from "react-hook-form";
import {useState} from "react";
import Slider from "react-slick";
import './_home.scss'
import SubjectCard from "../../Components/card/SubjectCard";
import UniversityCard from "../../Components/card/UniversityCard";

const Home = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState: {errors}} = useForm({mode: "onSubmit"});
    const [login, setLogin] = useState('')
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    const settings = {
        className: "paper_center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        speed: 500,
        accessibility: true,
        arrows: true,
        dots: true,
        variableWidth: true,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        adaptiveHeight: true
    };

    function SampleNextArrow(props) {
        const {className, style, onClick} = props;
        return (
            <ArrowForwardIos
                className={className}
                style={{
                    ...style,
                    display: "block",
                    color: "rgb(103, 119, 136)",
                    fontSize: 30,
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const {className, style, onClick} = props;
        return (
            <ArrowBackIos
                className={className}
                style={{
                    ...style,
                    display: "block",
                    color: "rgb(103, 119, 136)",
                    fontSize: 30,
                }}
                onClick={onClick}
            />
        );
    }


    const handleLoginChange = event => {
        setLogin(event.target.value)
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

    const animationBottomToTopThenHover = {
        visible: {y: 0, transition: {duration: 0.53}},
        hidden: {y: 20},
    }

    const subjects = [
        {
            name: "Physics",
            picture: "https://images.pexels.com/photos/60582/newton-s-cradle-balls-sphere-action-60582.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            name: "Math",
            picture: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            name: "History",
            picture: "https://images.pexels.com/photos/36006/renaissance-schallaburg-figures-facade.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            name: "Geography",
            picture: "https://images.pexels.com/photos/414916/pexels-photo-414916.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            name: "Chemistry",
            picture: "https://images.pexels.com/photos/7722797/pexels-photo-7722797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
    ]

    const universities = [
        {
            name: "Kazakh British Technical University",
            image: "data:image/png;base64,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",
            description: "Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor.",
            city: "Almaty",
            address: "Manasa street 8"
        },

        {
            name: "Kazakh British Technical University",
            image: "https://kbtu.edu.kz/images/logo_stzh.jpg",
            description: "Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor.",
            city: "Almaty",
            address: "Manasa street 8"
        },

        {
            name: "International Information Technology University",
            image: "data:image/jpeg;base64,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",
            description: "Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor.",
            city: "Almaty",
            address: "Manasa street 8"
        },

        {
            name: "Kazakh British Technical University",
            image: "https://asu.edu.ru/images/Image/KAzGYuU.jpg",
            description: "Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor.",
            city: "Almaty",
            address: "Manasa street 8"
        },

        {
            name: "Kazakh British Technical University",
            image: "https://coursefinder.go-study.uz/panel/uploads/logo/1595429298.png",
            description: "Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor.",
            city: "Almaty",
            address: "Manasa street 8"
        },

        {
            name: "Kazakh British Technical University",
            image: "data:image/png;base64,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",
            description: "Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor.",
            city: "Almaty",
            address: "Manasa street 8"
        },
        {
            name: "Kazakh British Technical University",
            image: "data:image/png;base64,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",
            description: "Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor.",
            city: "Almaty",
            address: "Manasa street 8"
        },
        {
            name: "Kazakh British Technical University",
            image: "data:image/png;base64,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",
            description: "Rather than worrying about switching offices every couple years, you can instead stay in the same location and grow-up from your shared coworking space to an office that takes up an entire floor.",
            city: "Almaty",
            address: "Manasa street 8"
        },
    ]

    const universityAnimationQueue = [5, 6, 7, 8, 9, 10]

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <motion.div
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{amount: 0.3, once: true}}>
                <Grid container item xs={12} style={{backgroundColor: "#e9f0f5", height: window.innerHeight * 0.9}}>
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
                        <Grid container justifyContent={"space-between"} flexDirection={"row"} xs={6}
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
                                                 animate={{rotate: 360, opacity: 1}}
                                                 transition={{duration: 1}}
                                                 style={{rotate: 0, opacity: 0}} custom={1}>
                                <Main style={{height:window.innerHeight*0.75}} />
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
                    paddingRight: 15,
                    height: window.innerHeight ,
                }} display={"flex"} flexDirection={"column"}>

                    <Grid container item justifyContent={"center"} flexDirection={"column"} alignContent={"center"}>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={1}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{
                                            color: "#FFC107",
                                            marginTop: 20,
                                            fontSize: 17,
                                            fontWeight: "bold"
                                        }}>NUMBERS</Typography>
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
                                <Button size={"large"} variant={"contained"} id={"primary_button"}
                                        style={{marginLeft: 15}}>View
                                    documentation</Button>
                            </Grid>
                        </CustomAnimatedComponent>
                    </Grid>

                    <Grid container item display={"flex"} flexDirection={"row"} justifyContent={"center"} marginTop={6}>
                        <Grid item xs={2} style={{marginLeft:30, marginRight:30}}>
                            <CustomAnimatedComponent variants={animationBottomToTop} custom={5}>

                                <Paper variant={"outlined"}
                                       style={{padding: 32, borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"}>
                                        <Avatar variant={"circular"} style={{
                                            marginBottom: 20,
                                            width: 50,
                                            height: 50,
                                            backgroundColor: "rgb(55, 125, 255)"
                                        }}>
                                            <Groups/>
                                        </Avatar>
                                        <Typography variant={"h4"} fontFamily={"Inter"}
                                                    style={{
                                                        color: "rgb(55, 125, 255)",
                                                        fontWeight: "bold",
                                                        fontSize: 30,
                                                        marginBottom: 8
                                                    }}>
                                            <ReactVisibilitySensor partialVisibility offset={{bottom: 8}}>
                                                {({isVisible}) => (
                                                    <div style={{height: 38}}>
                                                        {isVisible ? <CountUp delay={0.5} end={1000}/> : null}
                                                    </div>
                                                )}
                                            </ReactVisibilitySensor>
                                        </Typography>
                                        <Typography variant={"h6"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", fontSize: 25, marginBottom: 10}}>Expert
                                            instructors</Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)", fontSize: 18}}>Expert
                                            instructors to make sure courses are well.</Typography>
                                    </Box>
                                </Paper>
                            </CustomAnimatedComponent>
                        </Grid>

                        <Grid item xs={2} style={{marginLeft:30, marginRight:30}}>
                            <CustomAnimatedComponent variants={animationBottomToTop} custom={6}>

                                <Paper variant={"outlined"}
                                       style={{padding: 32, borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"}>
                                        <Avatar variant={"circular"} style={{
                                            marginBottom: 20,
                                            width: 50,
                                            height: 50,
                                            backgroundColor: "rgb(55, 125, 255)"
                                        }}>
                                            <School/>
                                        </Avatar>
                                        <Typography variant={"h4"} fontFamily={"Inter"}
                                                    style={{
                                                        color: "rgb(55, 125, 255)",
                                                        fontWeight: "bold",
                                                        fontSize: 30,
                                                        marginBottom: 8
                                                    }}>
                                            <ReactVisibilitySensor partialVisibility offset={{bottom: 8}}>
                                                {({isVisible}) => (
                                                    <div style={{height: 38}}>
                                                        {isVisible ? <CountUp delay={0.5} end={100}/> : null}
                                                    </div>
                                                )}
                                            </ReactVisibilitySensor>
                                        </Typography>
                                        <Typography variant={"h6"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", fontSize: 25, marginBottom: 10}}>Active
                                            students
                                        </Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)", fontSize: 18}}>100K+ Active
                                            students arround the world.</Typography>
                                    </Box>
                                </Paper>

                            </CustomAnimatedComponent>
                        </Grid>

                        <Grid item xs={2} style={{marginLeft:30, marginRight:30}}>
                            <CustomAnimatedComponent variants={animationBottomToTop} custom={7}>

                                <Paper variant={"outlined"}
                                       style={{padding: 32, borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"}>
                                        <Avatar variant={"circular"} style={{
                                            marginBottom: 20,
                                            width: 50,
                                            height: 50,
                                            backgroundColor: "rgb(55, 125, 255)"
                                        }}>
                                            <MenuBook/>
                                        </Avatar>
                                        <Typography variant={"h4"} fontFamily={"Inter"}
                                                    style={{
                                                        color: "rgb(55, 125, 255)",
                                                        fontWeight: "bold",
                                                        fontSize: 30,
                                                        marginBottom: 8
                                                    }}>
                                            <ReactVisibilitySensor partialVisibility offset={{bottom: 8}}>
                                                {({isVisible}) => (
                                                    <div style={{height: 38}}>
                                                        {isVisible ? <CountUp delay={0.5} end={400}/> : null}
                                                    </div>
                                                )}
                                            </ReactVisibilitySensor>
                                        </Typography>
                                        <Typography variant={"h6"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", fontSize: 25, marginBottom: 10}}>Free
                                            resources</Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)", fontSize: 18}}>Free resources
                                            for all students arround the world.</Typography>
                                    </Box>
                                </Paper>

                            </CustomAnimatedComponent>
                        </Grid>


                        <Grid item xs={2} style={{marginLeft:30, marginRight:30}}>
                            <CustomAnimatedComponent variants={animationBottomToTop} custom={8}>
                                <Paper variant={"outlined"}
                                       style={{padding: 32, borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"}>
                                        <Avatar variant={"circular"} style={{
                                            marginBottom: 20,
                                            width: 50,
                                            height: 50,
                                            backgroundColor: "rgb(55, 125, 255)"
                                        }}>
                                            <AccountBalance/>
                                        </Avatar>
                                        <Typography variant={"h4"} fontFamily={"Inter"}
                                                    style={{
                                                        color: "rgb(55, 125, 255)",
                                                        fontWeight: "bold",
                                                        fontSize: 30,
                                                        marginBottom: 8
                                                    }}>
                                            <ReactVisibilitySensor partialVisibility offset={{bottom: 8}}>
                                                {({isVisible}) => (
                                                    <div style={{height: 38}}>
                                                        {isVisible ? <CountUp delay={0.5} end={800}/> : null}
                                                    </div>
                                                )}
                                            </ReactVisibilitySensor>
                                        </Typography>
                                        <Typography variant={"h6"} fontFamily={"Inter"}
                                                    style={{color: "#2d3e4a", fontSize: 25, marginBottom: 10}}>Online
                                            courses</Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)", fontSize: 18}}>Choose from over
                                            1000+ online video courses.</Typography>
                                    </Box>
                                </Paper>
                            </CustomAnimatedComponent>
                        </Grid>

                    </Grid>
                </Grid>
            </motion.div>


            <motion.div
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{amount: 0.3, once: true}}
            >
                <Grid container item xs={12} style={{
                    backgroundColor: "#e9f0f5",
                    paddingTop: 40,
                    paddingBottom: 50,
                    paddingLeft: 15,
                    paddingRight: 15
                }} flexDirection={"column"}>
                    <Grid container item justifyContent={"center"} flexDirection={"column"} alignContent={"center"}>
                        <CustomAnimatedComponent variants={animationText} custom={1}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{
                                            color: "#FFC107",
                                            marginTop: 20,
                                            fontSize: 17,
                                            fontWeight: "bold"
                                        }}>CATEGORIES</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationText} custom={2}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "#2d3e4a", marginTop: 5, fontWeight: "bold", fontSize: 30}}>Choose
                                your course by categories</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationTextRightToLeft} custom={3}>
                            <Typography variant={"h6"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "rgb(103, 119, 136)", marginTop: 5}}>The best way to learn is by
                                using skills.<br/> Browse the available course categories, choose your favourite one and
                                start learning.</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationTextRightToLeft} custom={4}>
                            <Grid container item justifyContent={"center"} style={{marginTop: 15}}>
                                <Button size={"large"} variant={"outlined"} id={"primary_button_outlined"}>Purchase
                                    now</Button>
                                <Button size={"large"} onClick={() => navigate("/subjects", true)} variant={"contained"}
                                        id={"primary_button"}
                                        style={{marginLeft: 15}}>View
                                    documentation</Button>
                            </Grid>
                        </CustomAnimatedComponent>
                    </Grid>

                    <Grid item xs={10} alignSelf={"center"} style={{marginTop: 20, marginBottom: 20}}>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={5}>
                            <Slider {...settings} style={{height: 350, alignItems: "center", display: "flex"}}>
                                {subjects.map(subject => {
                                    return <Grid item style={{height: 300}}>
                                        <CustomAnimatedComponent whileHover={{y: -10}} style={{
                                            marginLeft: 20,
                                            marginRight: 20,
                                            borderRadius: 8, marginTop: 40, paddingBottom: 40,
                                            height: 300,
                                            display: "flex",
                                            alignItems: "center"
                                        }}>
                                            <SubjectCard subject={subject} height={290} width={290}/>
                                        </CustomAnimatedComponent>
                                    </Grid>
                                })}
                            </Slider>
                        </CustomAnimatedComponent>
                    </Grid>
                </Grid>
            </motion.div>

            <Box sx={{height: 20, width: "100%", alignSelf: "center", backgroundColor: "#e9f0f5"}} display={"flex"}
                 flexDirection={"row"} justifyContent={"center"}>
                <Grid xs={10} alignSelf={"center"}>
                    <Divider style={{height: 5, borderColor: "rgba(0, 0, 0, 0.12)"}}/>
                </Grid>
            </Box>


            <motion.div
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{amount: 0.3, once: true}}
            >
                <Grid container item xs={12} style={{
                    backgroundColor: "#e9f0f5",
                    paddingTop: 40,
                    paddingBottom: 50,
                    paddingLeft: 15,
                    paddingRight: 15
                }} flexDirection={"column"}>
                    <Grid container item justifyContent={"center"} flexDirection={"column"} alignContent={"center"}>
                        <CustomAnimatedComponent variants={animationText} custom={1}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "#FFC107", marginTop: 20, fontSize: 17, fontWeight: "bold"}}>POPULAR
                                COURSES</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationText} custom={2}>
                            <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "#2d3e4a", marginTop: 5, fontWeight: "bold", fontSize: 30}}>Browse
                                our popular courses</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationTextRightToLeft} custom={3}>
                            <Typography variant={"h6"} fontFamily={"Inter"} textAlign={"center"}
                                        style={{color: "rgb(103, 119, 136)", marginTop: 5}}>Here are our popular course
                                you might want to learn from your tutor.</Typography>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationTextRightToLeft} custom={4}>
                            <Grid container item justifyContent={"center"} style={{marginTop: 15}}>
                                <Button size={"large"} variant={"outlined"} id={"primary_button_outlined"}>View
                                    all</Button>
                                <Button size={"large"} variant={"contained"} id={"primary_button"}
                                        style={{marginLeft: 15}}>Explore More</Button>
                            </Grid>
                        </CustomAnimatedComponent>
                    </Grid>

                    <Grid container item flexDirection={"row"} justifyContent={"center"} xs={12}>

                        {
                            universities.map(university => {
                                return <CustomAnimatedComponent variants={animationTextRightToLeft} custom={5}>
                                    <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                        <CustomAnimatedComponent whileHover={{scale: 1.04}}>
                                            <UniversityCard university={university}/>
                                        </CustomAnimatedComponent>
                                    </Grid>
                                </CustomAnimatedComponent>
                            })
                        }
                    </Grid>
                </Grid>
            </motion.div>


            <motion.div
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{amount: 0.3, once: true}}
            >
                <Grid container item justifyContent={"center"} xs={12} style={{
                    background: "linear-gradient(#e9f0f5 40%, rgb(55, 125, 255) 0%) transparent",
                    paddingTop: 40,
                    paddingBottom: 50,
                    paddingLeft: 15,
                    paddingRight: 15
                }}>
                    <Grid item container xs={10}>
                        <Paper variant={"elevation"} elevation={0} style={{
                            width: "100%",
                            borderRadius: 8,
                            boxShadow: "rgb(140 152 164 / 18%) 0px 10px 40px 10px",
                            padding: "40px 20px 40px 20px"
                        }}
                               square={true}>
                            <CustomAnimatedComponent variants={animationText} custom={2}>
                                <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"center"}
                                            style={{color: "#2d3e4a", marginTop: 5, fontWeight: "bold", fontSize: 30}}>Subscribe
                                    to our newsletter</Typography>
                            </CustomAnimatedComponent>
                            <CustomAnimatedComponent variants={animationTextRightToLeft} custom={3}>
                                <Typography variant={"h6"} fontFamily={"Inter"} textAlign={"center"}
                                            style={{color: "rgb(103, 119, 136)", marginTop: 5}}>Don't lose a chance to
                                    be among the firsts to know about our upcoming news and updates.</Typography>
                            </CustomAnimatedComponent>
                            <CustomAnimatedComponent variants={animationTextRightToLeft} custom={4}>
                                <Grid container item justifyContent={"center"} xs={12} style={{marginTop: 20}}>
                                    <Grid item>
                                        <TextField style={{width: 400}} {...register("login", {
                                            required: 'Login field is required',
                                            minLength: {
                                                value: 2,
                                                message: "length must be greater than 1 character"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "length must be less than 50 character"
                                            }
                                        })} helperText={errors?.login && errors?.login?.message || ' '}
                                                   error={!!errors?.login} id={"user_email"} value={login}
                                                   onChange={handleLoginChange} type={"email"} label="Email"
                                                   variant="outlined"/>

                                    </Grid>
                                    <Grid item>
                                        <Button size={"large"} variant={"contained"} id={"primary_button"}
                                                style={{marginLeft: 15, height: 56}}>Explore More</Button>
                                    </Grid>
                                </Grid>
                            </CustomAnimatedComponent>
                        </Paper>
                    </Grid>
                </Grid>
            </motion.div>

        </Box>
    )
}

export default Home;
