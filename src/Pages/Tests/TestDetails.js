import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    CircularProgress, circularProgressClasses,
    Container,
    Divider,
    Grid,
    LinearProgress,
    linearProgressClasses,
    Tooltip,
    tooltipClasses
} from "@mui/material";
import {default as axios} from "axios";
import {API_BASE} from "../../Constants/Constants";
import {useForm} from "react-hook-form";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {InfoOutlined} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip as TooltipJS,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';


function TestDetails(props) {

    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPAge, setIsFirstPage] = useState(true);
    const [isStartTest, setIsStartTest] = useState(false);
    const [progress, setProgress] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageNumber, setCurrentPageNumber] = useState(-1);
    const [questionsCount, setQuestionsCount] = useState(0);
    const {register, handleSubmit, watch, formState: {errors}} = useForm({mode: "onBlur"});

    const data = {
        labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5'],
        datasets: [
            {
                label: '1 of Votes',
                data: [2, 9, 3, 5, 2],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: '2 of Votes',
                data: [5, 6, 3, 4, 5],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        TooltipJS,
        Legend
    );

    const test = {
        id: 1,
        name: "Klimov's test",
        description: "panel Liaison value-added",
        instruction: "                                    JHipster gives a great choice as one can choose between an image type or any binary type. JDL lets you do the same. Create a custom type (see DataType) with the editor, name it according to these conventions:\n" +
            "\n" +
            "                                    AnyBlob or Blob to create a field of the “any” binary type;\n" +
            "                                    ImageBlob to create a field meant to be an image.\n" +
            "                                    TextBlob to create a field for a CLOB (long text).\n" +
            "                                    And you can create as many DataTypes as you like.",
        picture: "https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    }

    const prevPage =()=>{
        getTestQuestions()
    }

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#F7F9FF',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 600,
            padding:10,
            fontSize: theme.typography.pxToRem(20),
            border: '1px solid #dadde9',
        },
    }));

    const onSubmit = (data)=> {
        setUserAnswers(data);
        console.log(data);
        if(isLastPage){
            console.log("sent to backend")
            console.log(data);
        }else{
            getTestQuestions();
        }
    }

    async function getTestQuestions() {
        try {
            let jwtToken = localStorage.getItem("token");
            const response = await axios.get(
                `${API_BASE}/test-questions/1?page=${currentPageNumber+1}&size=1&sort=id&order=desc`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (response.status === 200) {
                setQuestions(response.data.content);
                setTotalPages(response.data.totalPages);
                setIsLastPage(response.data.last);
                setIsFirstPage(response.data.first);
                setQuestionsCount(response.headers['x-total-count']);
                setCurrentPageNumber(response.data.number);
                setProgress(((response.data.number+1)*100)/response.data.totalPages)
            }
        } catch (error) {
            // enqueueSnackbar(`Login or password wrong! Please try again!`, {
            //     variant: "error",
            // });
            console.log(error)
        }
    }


    async function getTestQuestionsPrev() {
        try {
            let jwtToken = localStorage.getItem("token");
            const response = await axios.get(
                `${API_BASE}/test-questions/1?page=${currentPageNumber-1}&size=1&sort=id&order=desc`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
            if (response.status === 200) {
                setQuestions(response.data.content);
                setTotalPages(response.data.totalPages);
                setIsLastPage(response.data.last);
                setIsFirstPage(response.data.first);
                setQuestionsCount(response.headers['x-total-count']);
                setCurrentPageNumber(response.data.number);
                setProgress(((response.data.number+1)*100)/response.data.totalPages)
            }
        } catch (error) {
            // enqueueSnackbar(`Login or password wrong! Please try again!`, {
            //     variant: "error",
            // });
            console.log(error)
        }
    }

    async function testStart() {
        try {
            let jwtToken = localStorage.getItem("token");
            setIsStartTest(true);
            const response = await axios.get(
                `${API_BASE}/test-questions/1?page=0&size=1&sort=id&order=desc`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
            if (response.status === 200) {
                setQuestions(response.data.content);
                setTotalPages(response.data.totalPages);
                setIsLastPage(response.data.last);
                setIsFirstPage(response.data.first);
                setQuestionsCount(response.headers['x-total-count']);
                setCurrentPageNumber(response.data.number);
                setProgress(10)
            }
        } catch (error) {
            // enqueueSnackbar(`Login or password wrong! Please try again!`, {
            //     variant: "error",
            // });
            console.log(error)
        }
    }


    const handleTestSubmit = () =>{
        console.log(userAnswers)
    }



    useEffect(() => {

    }, [])


    function FacebookCircularProgress(props) {
        return (
            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: (theme) =>
                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={40}
                    thickness={4}
                    {...props}
                    value={100}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={40}
                    thickness={4}
                    {...props}
                />
            </Box>
        );
    }


    const startTest = () =>{
        return <form onSubmit={handleSubmit(onSubmit)}>
            {questions.map((question, index) => {
                return <Paper key={question.id} variant={"elevation"} elevation={3} style={{
                    borderRadius: 15,
                    boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                    marginBottom: 40,
                    padding: "30px 30px 30px 30px"
                }}
                              square={true}>
                    <Grid container direction={"column"} justifyContent={"space-between"}
                          marginBottom={1}>
                        <Grid item style={{width:"inherit", marginBottom:5}}>
                            <Typography variant={"h3"} fontFamily={"Inter"} style={{
                                color: "rgb(45, 62, 74)",
                                fontSize: 25,
                                fontWeight: "bold",
                                marginBottom: 10,
                                alignSelf:"end"
                            }}
                            >
                                Find out your type of thinking and learning directions
                            </Typography>
                        </Grid>
                        <Grid item style={{width:"inherit", marginBottom:5}}>
                            <img style={{width:"inherit", borderRadius:15}} src={"https://www.trentu.ca/online/sites/trentu.ca.online/files/images/banners/onlinestudybanner.jpg"}/>
                        </Grid>
                        <Grid item style={{marginBottom:25}}>
                            <BorderLinearProgress variant="determinate" value={progress} />
                        </Grid>
                        <Grid item container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>

                            <Typography variant={"h3"} fontFamily={"Inter"} style={{
                                color: "rgb(45, 62, 74)",
                                fontSize: 25,
                                fontWeight: "bold",
                                marginBottom: 10,
                                alignSelf:"end"
                            }}
                            >
                              question {(1*currentPageNumber)+(index+1)} of {questionsCount}
                            </Typography>
                        </Grid>

                        <Divider style={{marginBottom: 15}}/>
                        <Grid item>
                            <Typography variant={"h3"} fontFamily={"Inter"} style={{
                                color: "rgb(45, 62, 74)",
                                fontSize: 30,
                                fontWeight: "bold",
                                marginBottom: 15
                            }}
                            >
                                {question.question}
                            </Typography>
                        </Grid>
                        {question.answers.map(answer => {
                            return <Grid container display={"flex"} flexDirection={"row"}>
                                {/*<Typography variant={"subtitle1"} fontFamily={"Inter"} style={{*/}
                                {/*    color: "rgb(45, 62, 74)",*/}
                                {/*    fontSize: 18,*/}
                                {/*    marginLeft:5,*/}
                                {/*    alignSelf: "center"*/}
                                {/*}}*/}
                                {/*><input*/}
                                {/*    style={{alignSelf: "center",width:18,height:18,margin:0}}*/}
                                {/*    {...register(`${question.id}`, {required: true})}*/}
                                {/*    type="radio" value={answer.id}/>*/}

                                {/*    {answer.answer}*/}
                                {/*</Typography>*/}

                                <label style={{
                                    color: "rgb(45, 62, 74)",
                                    fontSize: 18,
                                    marginBottom:10,
                                    alignSelf: "center",
                                    cursor:"pointer",
                                    display:"flex"
                                }}>
                                    <input
                                        style={{alignSelf: "center",width:18,height:18,margin:0, marginRight:7, verticalAlign:"center"}}
                                        {...register(`${question.id}`, {required: true})}
                                        type="radio" value={answer.id}/>
                                    {/*{errors.question.id?.type === 'required' && "First name is required"}*/}
                                    {answer.answer}
                                </label>

                            </Grid>
                        })}
                    </Grid>
                    <Grid item container display={"flex"} justifyContent={"space-between"}>
                        { isLastPage ?
                            <><Button id={"warning_button"} size={"large"} type={"submit"} variant="contained"
                                      fontFamily={"Inter"}>Submit</Button>
                            </>
                            :
                            <><Button id={"warning_button"} size={"large"} type={"submit"} variant="contained"
                                      fontFamily={"Inter"}>Next</Button>

                            </>
                        }
                        {isFirstPAge ?
                            null
                            :
                            <Button id={"primary_button"} size={"large"} type={"button"}
                                    onClick={() => getTestQuestionsPrev()} variant="contained"
                                    fontFamily={"Inter"}>Back</Button>
                        }
                    </Grid>
                </Paper>
            })}

            {/*<Grid container>*/}
            {/*    {questions.map(()=>{*/}
            {/*    */}
            {/*    }*/}
            {/*    })*/}
            {/*</Grid>*/}

        </form>
    }


    const testDetailsPaper = () =>{
        return <Paper variant={"elevation"} elevation={3} style={{
            borderRadius: 8,
            boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
            marginBottom: 40,
            padding: "20px 20px 20px 20px"
        }}
                      square={true}>
            <Grid container display={"flex"} flexDirection={"column"}>
                <Grid style={{marginBottom:7}} container item display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    <Typography variant={"h3"} fontFamily={"Inter"} style={{
                        color: "rgb(45, 62, 74)",
                        fontSize: 25,
                        fontWeight: "bold"
                    }}
                    >
                        {test.name}

                    </Typography>

                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">Tooltip with HTML</Typography>
                                {test.instruction}
                            </React.Fragment>
                        }
                    >
                        <IconButton style={{padding:0}} color="primary" aria-label="add an alarm">
                            <InfoOutlined/>
                        </IconButton>
                    </HtmlTooltip>
                </Grid>
                <Typography variant={"h5"} fontFamily={"Inter"}
                            style={{color: "rgb(45, 62, 74)", fontSize: 20, marginBottom:10}}>
                    {test.description}
                    AnyBlob or Blob to create a field of the “any” binary type;
                    ImageBlob to create a field meant to be an image.
                    TextBlob to create a field for a CLOB (long text).
                    And you can create as many DataTypes as you like.AnyBlob or Blob to create a field of the “any” binary type;
                    ImageBlob to create a field meant to be an image.
                    TextBlob to create a field for a CLOB (long text).
                    And you can create as many DataTypes as you like.
                </Typography>
                <Grid item xs={12}>
                    <Button onClick={()=>testStart()} id={"warning_button"}  size={"large"} type={"submit"} variant="contained" fontFamily={"Inter"}>Start Test</Button>
                </Grid>
            </Grid>
        </Paper>
    }


    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box style={{
            backgroundColor: "#F7F9FF",
        }}>
            <Box style={{
                backgroundImage: `url("${test.picture}")`,
                backgroundRepeat: "no-repeat",
                height: "520px"
            }}>
                <Box style={{
                    backgroundColor: "rgba(0,0,0,.5)",
                    height: "520px"
                }}
                     display={"flex"} flexDirection={"column"} justifyContent={"center"}
                >
                    <Typography variant={"h3"} fontFamily={"Inter"} fontWeight={"bold"} textAlign={"center"}
                                style={{color: "white", marginBottom: 1}}>{test.name}</Typography>
                    <Typography variant={"h3"} fontFamily={"Inter"} fontWeight={"bold"} textAlign={"center"}
                                style={{color: "white", marginBottom: 10}}>A test to determine the
                        profession</Typography>
                    <Typography variant={"body1"} fontFamily={"Inter"} fontWeight={"bold"} textAlign={"center"}
                                style={{color: "white", marginBottom: 0}}>Take the test and find out who your profession
                        is</Typography>
                </Box>
            </Box>


            <Box style={{
                backgroundColor: "#e9f0f5",
                paddingBottom: 30,
                paddingTop: 30,
                display:"flex", justifyContent:"center"
            }}>
                <Grid container item xs={11} sm={11} md={10} lg={8} xl={8} isplay={"flex"} justifyContent={"center"} style={{width:"70%", alignSelf:"center"}}>
                    <Grid xs={12} display={"flex"} justifyContent={"center"} >

                        {isStartTest ? questions.length!==0 ? startTest() : <FacebookCircularProgress /> : testDetailsPaper()}
                        {/*<Radar data={data} />*/}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: "rgb(55, 125, 255)",
    },
}));

export default TestDetails;