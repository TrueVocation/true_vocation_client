import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    CircularProgress,
    circularProgressClasses,
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
import useAuth from "../../AuthConfig/useAuth";
import { Show } from 'react-haiku';
import {Radar} from "react-chartjs-2";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";


function TestDetails(props) {
    const {user} = useAuth()

    const [testResult, setTestResult] = useState([])
    const [isFinish, setIsFinish] = useState(false)

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
        labels: ['1-Работа с людьми',
                 '2-Интеллектуальная',
                 '3-Практическая',
                 '4-Творческая',
                 '5-Экстремальные виды',
                 '6-Планово-экономические'],
        datasets: [
            {
                label: '1 of Votes',
                data: [
                    testResult.userAptitudes != null ? testResult.userAptitudes[0]?.score : 0,
                    testResult.userAptitudes != null ? testResult.userAptitudes[1]?.score : 0,
                    testResult.userAptitudes != null ? testResult.userAptitudes[2]?.score : 0,
                    testResult.userAptitudes != null ? testResult.userAptitudes[3]?.score : 0,
                    testResult.userAptitudes != null ? testResult.userAptitudes[4]?.score : 0,
                    testResult.userAptitudes != null ? testResult.userAptitudes[5]?.score : 0, ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            // {
            //     label: 'Min Value 0',
            //     data: [0,0,0,0,0,0],
            //     backgroundColor: 'transparent',
            //     borderColor: 'transparent',
            //     borderWidth: 1,
            // },
            // {
            //     label: 'Max Value 12',
            //     data: [12,12,12,12,12,12    ],
            //     backgroundColor: 'transparent',
            //     borderColor: 'transparent',
            //     borderWidth: 1,
            // },
            // // {
            // //     label: '2 of Votes',
            // //     data: [8,8,8,8,8,8],
            // //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
            // //     borderColor: 'rgba(54, 162, 235, 1)',
            // //     borderWidth: 1,
            // // },

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
        picture: "https://postupi.online/images/tests-bg.svg"
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
        if(isLastPage){
            console.log(user)
            console.log("sent to backend")
            const answerUserDTOs = []
            for(var i=1; i<25;i++){
                answerUserDTOs.push({
                        testResult:null,
                        question: {
                            id: i,
                            question:""
                        },
                        answer: {
                            id: parseInt(data[`${i}`]),
                            answer:""
                        },
                        appUser: {
                           id: user.appUserId
                        }
                })
            }

            console.log(answerUserDTOs)
            submitAnswers(answerUserDTOs)
        }else{
            getTestQuestions();
        }
    }

    async function submitAnswers(answerUserDTOs) {
        try {
            let jwtToken = localStorage.getItem("token");
            console.log(answerUserDTOs)
            const response = await axios.post(
                `${API_BASE}/answer-users-list`, answerUserDTOs,{
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
            if (response.status === 200) {
              console.log(response)
                getTestResult()
            }
        } catch (error) {
            // enqueueSnackbar(`Login or password wrong! Please try again!`, {
            //     variant: "error",
            // });
            console.log(error)
        }
    }

    async function getTestResult() {
        try {
            let jwtToken = localStorage.getItem("token");
            const response = await axios.get(
                `${API_BASE}/user-test-result/${user.appUserId}`,{
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
            if (response.status === 200) {
                console.log(response.data)
                setTestResult(response.data)
                setIsFinish(true)
            }
        } catch (error) {
            // enqueueSnackbar(`Login or password wrong! Please try again!`, {
            //     variant: "error",
            // });
            console.log(error)
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
                        color: (theme) => (theme.palette.mode === 'light' ? '#604BE8' : '#604BE8'),
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
                                        style={{alignSelf: "center",width:18,height:18,margin:0, marginRight:7, verticalAlign:"center",color:"rgb(131, 0, 184)"}}
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


            {/*<Grid item container display={"flex"} justifyContent={"space-between"}>*/}
            {/*    { isLastPage ?*/}
            {/*        <><Button id={"warning_button"} size={"large"} type={"submit"} variant="contained"*/}
            {/*                  fontFamily={"Inter"}>Submit</Button>*/}
            {/*        </>*/}
            {/*        :*/}
            {/*        <><Button id={"warning_button"} size={"large"} type={"submit"} variant="contained"*/}
            {/*                  fontFamily={"Inter"}>Next</Button>*/}

            {/*        </>*/}
            {/*    }*/}
            {/*    {isFirstPAge ?*/}
            {/*        null*/}
            {/*        :*/}
            {/*        <Button id={"primary_button"} size={"large"} type={"button"}*/}
            {/*                onClick={() => getTestQuestionsPrev()} variant="contained"*/}
            {/*                fontFamily={"Inter"}>Back</Button>*/}
            {/*    }*/}
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
                        <IconButton style={{padding:0,color:"#604BE8"}} aria-label="add an alarm">
                            <InfoOutlined/>
                        </IconButton>
                    </HtmlTooltip>
                </Grid>
                <Typography variant={"h5"} fontFamily={"Inter"}
                            style={{color: "rgb(45, 62, 74)", fontSize: 20, marginBottom:10}}>
                    This test is designed to identify a person's predisposition to a certain type of profession. The test is used for selection for various types of professions in accordance with the classification of types of professions by E.A.Klimov. This is a classic career guidance test "Differential Diagnostic Questionnaire (DDO)", which is used for career guidance and professional selection of adolescents and adults. According to the results of the survey, the orientation of a person to 5 types of professions is revealed, according to the classification of E.A.Klimov
                </Typography>
                <Grid item xs={12}>
                    <Button onClick={()=>testStart()} id={"warning_button"}  size={"large"} type={"submit"} variant="contained" fontFamily={"Inter"}>Start Test</Button>
                    <Button onClick={()=>getTestResult()} id={"warning_button"}  size={"large"} type={"submit"} variant="contained" fontFamily={"Inter"}>Test Result</Button>
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

    function defineColor(score){
        if(score <= 3){
            return "rgb(255, 25, 67)"
        }
        else if(score > 3 && score <=6){
            return "rgb(255, 163, 25)";
        }
        else if(score > 6 && score <=9) {
            return "rgb(51, 194, 255)";
        }
        else {
            return "rgb(87, 202, 34)";
        }
    }

    return (
        <Box style={{
            backgroundColor: "#F7F9FF",
        }}>
            <Box style={{
                backgroundImage: `url("${test.picture}")`,
                height: "520px",
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                display:"flex",
                justifyContent:"center"
            }}>
                <Grid container xs={11} sm={11} md={10} lg={8} xl={8}
                     display={"flex"} flexDirection={"column"} justifyContent={"center"} alignSelf={"center"}
                >
                    <Grid item xs={12}>
                        <Typography variant={"h3"} fontFamily={"Inter"} fontWeight={"bold"}
                                    style={{color: "white", marginBottom: 1}}>{test.name}</Typography>
                        <Typography variant={"h3"} fontFamily={"Inter"} fontWeight={"bold"}
                                    style={{color: "white", marginBottom: 10}}>A test to determine the
                            profession</Typography>
                        <Typography variant={"body1"} fontFamily={"Inter"} fontWeight={"bold"}
                                    style={{color: "white", marginBottom: 0}}>Take the test and find out who your profession
                            is</Typography>
                    </Grid>

                </Grid>
            </Box>


            <Box style={{
                backgroundColor: "#e9f0f5",
                paddingBottom: 30,
                paddingTop: 30,
                display:"flex", justifyContent:"center"
            }}>
                <Grid container item xs={11} sm={11} md={10} lg={8} xl={12} isplay={"flex"} justifyContent={"center"} style={{width:"100%", alignSelf:"center"}}>
                    <Show>
                        <Show.When isTrue={isFinish}>
                            <Grid item xs={11.5} container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                <Grid item xs={3.5}>
                                    <Paper variant={"elevation"} elevation={3} style={{
                                        borderRadius: 15,
                                        boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                                        marginBottom: 40,
                                        padding: "30px 30px 30px 30px",
                                        backgroundColor: "white"
                                    }}>
                                        <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                            <Grid item xs={12} container display={"flex"} flexDirection={"row"}>
                                                <Grid item xs={12}>
                                                    <Typography variant={"h5"} fontFamily={"Inter"}
                                                                style={{color: "#2d3e4a", marginBottom: 5, fontWeight: "bold", fontSize: 16}}>
                                                        Шесть столбцов – это шесть видов деятельности. Обратите внимание на те виды деятельности, которые набрали большее количество баллов. Совпадает ли ваш выбор профессии с полученными результатами?
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2}>
                                    <Paper variant={"elevation"} elevation={3} style={{
                                        borderRadius: 15,
                                        boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                                        marginBottom: 40,
                                        padding: "30px 30px 30px 30px",
                                        backgroundColor: "rgb(87, 202, 34)"
                                    }}>
                                        <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                            <Grid item xs={1} container display={"flex"}>
                                                <Avatar sx={{padding:1, bgcolor: 'white',fontSize:14,color:"rgb(87, 202, 34)",fontWeight:"bold" }}>
                                                    10-12
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={8} container display={"flex"} flexDirection={"row"}>
                                                <Grid item xs={12}>
                                                    <Typography variant={"h5"} fontFamily={"Inter"}
                                                                style={{color: "white", marginBottom: 5, fontWeight: "bold", fontSize: 16}}>
                                                        Ярко выраженная профессиональная склонность
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2}>
                                    <Paper variant={"elevation"} elevation={3} style={{
                                        borderRadius: 15,
                                        boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                                        marginBottom: 40,
                                        padding: "30px 30px 30px 30px",
                                        backgroundColor: "rgb(51, 194, 255)"
                                    }}>
                                        <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                            <Grid item xs={1} container display={"flex"}>
                                                <Avatar sx={{padding:1, bgcolor: 'white',fontSize:20,color:"rgb(51, 194, 255)",fontWeight:"bold" }}>
                                                    7-9
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={8} container display={"flex"} flexDirection={"row"}>
                                                <Grid item xs={12}>
                                                    <Typography variant={"h5"} fontFamily={"Inter"}
                                                                style={{color: "white", marginBottom: 5, fontWeight: "bold", fontSize: 16}}>
                                                        Cклонность к определенному виду деятельности
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2}>
                                    <Paper variant={"elevation"} elevation={3} style={{
                                        borderRadius: 15,
                                        boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                                        marginBottom: 40,
                                        padding: "30px 30px 30px 30px",
                                        backgroundColor: "rgb(255, 163, 25)"
                                    }}>
                                        <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                            <Grid item xs={1} container display={"flex"}>
                                                <Avatar sx={{padding:1, bgcolor: 'white',fontSize:20,color:"rgb(255, 163, 25)",fontWeight:"bold" }}>
                                                    4-6
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={8} container display={"flex"} flexDirection={"row"}>
                                                <Grid item xs={12}>
                                                    <Typography variant={"h5"} fontFamily={"Inter"}
                                                                style={{color: "white", marginBottom: 5, fontWeight: "bold", fontSize: 16}}>
                                                        Слабо выраженная профессиональная склонность
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2}>
                                    <Paper variant={"elevation"} elevation={3} style={{
                                        borderRadius: 15,
                                        boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                                        marginBottom: 40,
                                        padding: "30px 30px 30px 30px",
                                        backgroundColor: "rgb(255, 25, 67)"
                                    }}>
                                        <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                            <Grid item xs={1} container display={"flex"}>
                                                <Avatar sx={{padding:1, bgcolor: 'white',fontSize:20,color:"rgb(255, 25, 67)",fontWeight:"bold" }}>
                                                    0-3
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={8} container display={"flex"} flexDirection={"row"}>
                                                <Grid item xs={12}>
                                                    <Typography variant={"h5"} fontFamily={"Inter"}
                                                                style={{color: "white", marginBottom: 5, fontWeight: "bold", fontSize: 16}}>
                                                        Профессиональная склонность не выражена
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>



                                {/*<Paper variant={"elevation"} elevation={3} style={{*/}
                                {/*    borderRadius: 15,*/}
                                {/*    boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",*/}
                                {/*    marginBottom: 40,*/}
                                {/*    padding: "30px 30px 30px 30px"*/}
                                {/*}}>*/}
                                {/*    <Grid container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>*/}
                                {/*       */}
                                {/*        <Stack direction="column" spacing={1}>*/}
                                {/*            <Chip variant={"outlined"} label="0-3 баллов – профессиональная склонность не выражена." color="error" />*/}
                                {/*            <Chip variant={"outlined"} label="4-6 баллов – слабо выраженная профессиональная склонность." color="warning" />*/}
                                {/*            <Chip variant={"outlined"} label="7-9 баллов – склонность к определенному виду деятельности." color="primary" />*/}
                                {/*            <Chip variant={"outlined"} label="10-12 баллов – ярко выраженная профессиональная склонность." color="success" />*/}
                                {/*        </Stack>*/}
                                {/*    </Grid>*/}
                                {/*</Paper>*/}
                            </Grid>
                            <Grid xs={11.5} display={"flex"} justifyContent={"space-between"} mb={2} >
                                <Grid item xs={5.8}>

                                    {
                                        testResult?.userAptitudes?.map(item=>{
                                            return <Grid item xs={12}>
                                            <Paper variant={"elevation"} elevation={3} style={{
                                                borderRadius: 15,
                                                boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                                                marginBottom: 40,
                                                padding: "30px 30px 30px 30px",
                                                position:"relative"
                                            }}
                                                   square={true}>
                                                <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                                    <Grid item xs={2.5} container display={"flex"} alignItems={"center"}>
                                                        <Avatar sx={{padding:4, bgcolor: defineColor(item.score) ,fontSize:20 }}>
                                                            {item.score}/12
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item xs={9.5} container display={"flex"} flexDirection={"row"}>
                                                        <Grid item xs={12}>
                                                            <Typography variant={"h5"} fontFamily={"Inter"}
                                                                        style={{color: "#2d3e4a", marginBottom: 5, fontWeight: "bold", fontSize: 22}}>
                                                                {item.aptitudeDTO.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant={"h5"} fontFamily={"Inter"}
                                                                        style={{color: "#2d3e4a",  fontWeight: "bold", fontSize: 16}}>
                                                                {item.aptitudeDTO.description}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Avatar variant={"square"} sx={{
                                                    bgcolor: '#604BE8',
                                                    fontSize:20 ,
                                                    position:"absolute",
                                                    top:0,
                                                    borderRadius: 1,
                                                    right:0,
                                                }}>
                                                    {item.aptitudeDTO.code}
                                                </Avatar>

                                            </Paper>
                                            </Grid>
                                        })
                                    }
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper variant={"elevation"} elevation={3} style={{
                                        borderRadius: 15,
                                        boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                                        marginBottom: 40,
                                        padding: "30px 30px 30px 30px"
                                    }}
                                           square={true}>
                                        <Radar data={data} />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Show.When>
                        <Show.Else>
                            <Grid xs={12} display={"flex"} justifyContent={"center"} >
                                {isStartTest ? questions.length!==0 ? startTest() : <FacebookCircularProgress /> : testDetailsPaper()}
                            </Grid>
                        </Show.Else>
                    </Show>

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
        backgroundColor: "#604BE8",
    },
}));

export default TestDetails;