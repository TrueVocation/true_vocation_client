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
                    position: "absolute",
                    left: 1255
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
                    position: "absolute",
                    left: -35
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
        {name: "Physics"},
        {name: "Physics"},
        {name: "Physics"},
        {name: "Physics"},
        {name: "Physics"},
    ]

    const universities = [
        {
            name: "Kazakh British Technical University",
            image: "https://www.kaznu.kz/Content/kaznu/img/others/logo.png",
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
    ]

    const universityAnimationQueue = [5, 6, 7, 8, 9, 10]

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
                                                 animate={{rotate: 360, opacity: 1}}
                                                 transition={{duration: 1}}
                                                 style={{rotate: 0, opacity: 0}} custom={1}>
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

                    <Grid container item justifyContent={"center"} xs={12}>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={5}>
                            <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                <Paper variant={"outlined"}
                                       style={{padding: 32, borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"} width={230}>
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
                                                    style={{color: "#2d3e4a", fontSize: 20, marginBottom: 10}}>Expert
                                            instructors</Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)", fontSize: 15}}>Expert
                                            instructors to make sure courses are well.</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={6}>
                            <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                <Paper variant={"outlined"}
                                       style={{padding: 32, borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"} width={230}>
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
                                                    style={{color: "#2d3e4a", fontSize: 20, marginBottom: 10}}>Active
                                            students
                                        </Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)", fontSize: 15}}>100K+ Active
                                            students arround the world.</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={7}>
                            <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                <Paper variant={"outlined"}
                                       style={{padding: 32, borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"} width={230}>
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
                                                    style={{color: "#2d3e4a", fontSize: 20, marginBottom: 10}}>Free
                                            resources</Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)", fontSize: 15}}>Free resources
                                            for all students arround the world.</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </CustomAnimatedComponent>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={8}>
                            <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                <Paper variant={"outlined"}
                                       style={{padding: 32, borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.12)"}}
                                       square={true}>
                                    <Box flexDirection={"column"} width={230}>
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
                                                    style={{color: "#2d3e4a", fontSize: 20, marginBottom: 10}}>Online
                                            courses</Typography>
                                        <Typography variant={"body1"} fontFamily={"Inter"}
                                                    style={{color: "rgb(103, 119, 136)", fontSize: 15}}>Choose from over
                                            1000+ online video courses.</Typography>
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
                                <Button size={"large"} variant={"contained"} id={"primary_button"}
                                        style={{marginLeft: 15}}>View
                                    documentation</Button>
                            </Grid>
                        </CustomAnimatedComponent>
                    </Grid>

                    <Grid item xs={10} alignSelf={"center"} style={{marginTop: 20, marginBottom: 20}}>
                        <CustomAnimatedComponent variants={animationBottomToTop} custom={5}>
                            <Slider {...settings} style={{height: 300}}>
                                {subjects.map(() => {
                                    return <Grid item style={{height: 300}}>
                                        <CustomAnimatedComponent whileHover={{y: -10}} style={{
                                            marginLeft: 20,
                                            marginRight: 20,
                                            height: 300,
                                            display: "flex",
                                            alignItems: "center"
                                        }}>
                                            <SubjectCard/>
                                        </CustomAnimatedComponent>
                                    </Grid>
                                })}
                            </Slider>
                        </CustomAnimatedComponent>
                    </Grid>
                </Grid>
            </motion.div>

            <Box sx={{height: 20, width: "100%", alignSelf: "center", backgroundColor: "#F7F9FF"}} display={"flex"}
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
                    backgroundColor: "#F7F9FF",
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

                    <Grid container item justifyContent={"center"} xs={12}>

                        {
                            universities.map(university => {
                                return <CustomAnimatedComponent variants={animationTextRightToLeft} custom={5}>
                                    <Grid item style={{paddingLeft: 32, paddingTop: 32}}>
                                        <CustomAnimatedComponent whileHover={{y: -10}}>
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
                    background: "linear-gradient(#F7F9FF 40%, rgb(55, 125, 255) 0%) transparent",
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