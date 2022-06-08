import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {
    CircularProgress,
    circularProgressClasses,
    Divider,
    FormControl,
    Grid,
    Input,
    LinearProgress,
    linearProgressClasses,
    Select,
    TextField
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
    ArrowForwardIos,
    CheckCircle,
    Clear,
    DoNotDisturbOn,
    PersonOutline,
    PhotoCamera,
    SettingsOutlined
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import {API_BASE} from "../../Constants/Constants";
import {default as axios} from "axios";
import useAuth from "../../AuthConfig/useAuth";
import {styled} from "@mui/material/styles";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Chip from "@mui/material/Chip";
import {Show} from 'react-haiku';
import {useNavigate} from "react-router-dom";
import JsPDF from 'jspdf';
import Report from "./Report";
import ChangePassword from "../User/ChangePassword";



const Head = ({state, setState, setGenerate, generate}) =>{
    return <Grid item xs={12} mb={2}>
        <Paper style={{
            boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
            padding: "25px 30px",
            borderRadius: 12,
            margin: "15px 0",
        }}>
            <Grid container display={"flex"} flexDirection={"row"}>
                <Grid item xs={2}  container display={"flex"} flexDirection={"row"} alignItems={"center"}>
                    <Typography variant={"h5"} fontFamily={"Inter"}
                                style={{
                                    color: "rgb(45, 62, 74)",
                                    fontSize: 25,
                                    fontWeight: "bold",
                                }}>My Portfolio</Typography>
                </Grid>
              <Grid item xs={10} container>
                  <Grid onClick={()=>setState(0)} style={{cursor:"pointer"}} item xs={2} container display={"flex"} flexDirection={"row"} alignItems={"center"}>
                      <Avatar variant={"circular"} style={{
                           width: 50, height: 50, backgroundColor: state===0 ?  "#E7E4FC" : "#EDF0FF"
                      }}>
                          <PersonOutline fontSize={"large"} style={{
                              color: state === 0 ? "#604BE8" : "#969DB6"
                          }} />
                      </Avatar>
                      <Typography variant={"h5"} fontFamily={"Inter"}
                                  style={{
                                      color: state === 0 ? "#604BE8" : "#969DB6",
                                      fontSize: 18,
                                      marginLeft:10,
                                      fontWeight:"bold"
                                  }}>Profile</Typography>
                  </Grid>
                  <Grid onClick={()=>setState(1)} style={{cursor:"pointer"}} item xs={2} container display={"flex"} flexDirection={"row"} alignItems={"center"}>
                      <Avatar variant={"circular"} style={{
                          width: 50, height: 50, backgroundColor: state===1 ?  "#E7E4FC" : "#EDF0FF"
                      }}>
                          <SettingsOutlined fontSize={"large"} style={{
                              color:state === 1 ? "#604BE8" : "#969DB6"
                          }} />
                      </Avatar>
                      <Typography variant={"h5"} fontFamily={"Inter"}
                                  style={{
                                      color:state === 1 ? "#604BE8" : "#969DB6",
                                      fontSize: 18,
                                      marginLeft:10,
                                      fontWeight:"bold"
                                  }}>Settings</Typography>
                  </Grid>
                  <Grid item xs={2} container alignSelf={"flex-end"} display={"flex"}>
                      <Button id={"primary_button"} onClick={()=>setGenerate(true)}>Export</Button>
                      {generate ? "true" : "false"}
                  </Grid>

              </Grid>

            </Grid>

        </Paper>
    </Grid>
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#604BE8' : '#604BE8',
    },
}));

function FacebookCircularProgress({progress}) {
    return (
        <Box sx={{ position: 'relative',display: 'inline-flex' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={150}
                value={100}
            />
            <CircularProgress
                variant="determinate"
                disableShrink
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#604BE8' : '#604BE8'),
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={150}
                value={progress}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography style={{color:"#604BE8"}} fontSize={30} fontWeight={"bold"} variant="caption" component="div" color="text.secondary">
                    {`${progress}%`}
                </Typography>
            </Box>
        </Box>
    );
}

const Achievement = ({achievement}) =>{
    const [image, setImage] = useState('');

    async function fetchImage() {
        try {
            let jwtToken = localStorage.getItem("token");
            const url = new URL(`${API_BASE}/achievements/viewPicture`);
            url.searchParams.set("url", achievement.picture)
            const response = await axios.get(url.toString(), {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (response.status === 200) {
                const contentType = response.headers['content-type']
                console.log(response.headers)
                setImage(`data:${contentType};base64,` + response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchImage()
    },[])

    return <Paper style={{
                    boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
                    borderRadius: 12,
                    margin: "15px 0",
                }}>
                <Grid container xs={12} display={"flex"} flexDirection={"column"}>
                    <Grid item xs={12}>
                        <img style={{width:"100%"}} src={image}/>
                    </Grid>
                    <Grid container display={"flex"} flexDirection={"column"}>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 18,
                                        marginBottom:7,
                                    }}>{achievement.name}</Typography>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 16,
                                        marginBottom:7,
                                    }}>{achievement.receivedDate}</Typography>
                    </Grid>
                </Grid>
    </Paper>
}

function Portfolio(props) {
    const Input = styled('input')({
        display: 'none',
    });

    const [state, setState] = useState(0)
    const [generate, setGenerate] = useState(false)

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [openSchoolDialog, setOpenSchoolDialog] = React.useState(false);
    const [openLanguageDialog, setOpenLanguageDialog] = React.useState(false);
    const [openAchievementDialog, setOpenAchievementDialog] = React.useState(false);
    const [schools, setSchools] = useState([])
    const [mySchools, setMySchools] = useState([])
    const [school, setSchool] = useState(null)
    const [languages, setLanguages] = useState([])
    const [myLanguages, setMyLanguages] = useState([])
    const [language, setLanguage] = useState(null)

    const [achievementName, setAchievementName] = useState('')
    const [achievementDate, setAchievementDate] = useState(null)
    const [file, setFile] = useState(null)
    const [myAchievements, setMyAchievements] = useState([])

    const [portfolio, setPortfolio] = useState(null);


    const handleClickOpenAchievementDialog = () => {
        setOpenAchievementDialog(true);
    };

    const handleCloseAchievementDialog = () => {
        setOpenAchievementDialog(false);
    };

    const handleClickOpenSchoolDialog = () => {
        setOpenSchoolDialog(true);
    };

    const handleCloseSchoolDialog = () => {
        setOpenSchoolDialog(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenLanguageDialog = () => {
        setOpenLanguageDialog(true);
    };

    const handleClickCloseLanguageDialog = () => {
        setOpenLanguageDialog(false);
    };

    const [hobby, setHobby] = useState('')
    const [hobbyCounter, setHobbyCounter] = useState(5)
    const [chipData, setChipData] = React.useState([]);

    const handleAddShip = () => {
        setChipData(prevState => [...prevState,  { key: hobbyCounter, label: hobby }])
        setHobby("")
        setHobbyCounter(prevState => prevState+1)
        setOpen(false)
    }

    const handleAddSchool = () => {
        setMySchools(prevState => [...prevState,  school])
        setSchool(null)
        setOpenSchoolDialog(false);
    }

    const handleDeleteSchool = (school) => () => {
        setMySchools((chips) => chips.filter((sc) => sc.id !== school.id));
    };

    const handleAddLanguage = () => {
        setMyLanguages(prevState => [...prevState,  language])
        setLanguage(null)
        setOpenLanguageDialog(false);
    }

    const handleDeleteLanguage = (language) => () => {
        setMyLanguages((languages) => languages.filter((lng) => lng.id !== language.id));
    };

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const auth = useAuth();
    const {register, handleSubmit, watch, formState: {errors, isSubmitSuccessful}, reset,} = useForm({mode: "onBlur"});
    const [login, setLogin] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState(null);
    const [aboutMe, setAboutMe] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    const [portfolioProgress, setPortfolioProgress] = useState(0)

    const defineProgress = (portfolio) => {
        let progress = 0
        if((null !== firstName && firstName !== '') || (null !== lastName && lastName !== '')){
            progress+=10
            console.log(progress)
            console.log("firstname")
        }
        if(phoneNumber != null && phoneNumber !== ''){
            progress+=10
            console.log(progress)
            console.log("phoneNumber")
        }
        if(setBirthdate != null){
            progress+=10
            console.log(progress)
            console.log("setBirthdate")
        }
        if(auth.avatar !==null || auth.avatar!==''){
            progress+=10
            console.log(progress)
            console.log("avatar")
        }
        if(gender !==null || gender!==''){
            progress+=10
            console.log(progress)
            console.log("gender")
        }
        if(portfolio.hobby!==null && portfolio.hobby!==''){
            progress+=10
            console.log(progress)
            console.log("chipData")
        }
        if(portfolio.aboutMe != null && portfolio.aboutMe !== ''){
            progress+=10
            console.log(progress)
            console.log("aboutMe")
        }
        if(portfolio.schools.length!==0){
            progress+=10
            console.log(progress)
            console.log("mySchools")
        }
        if(portfolio.languages.length!==0){
            progress+=10
            console.log(progress)
            console.log("myLanguages")
        }
        setPortfolioProgress(progress)
    }


    const handleChange = (event) => {
        console.log(event)
        if (event.target.name === 'login') {
            setLogin(event.target.value);
        } else if (event.target.name === 'firstName') {
            setFirstName(event.target.value);
        } else if (event.target.name === 'lastName') {
            setLastName(event.target.value);
        } else if (event.target.name === 'email') {
            setEmail(event.target.value);
        } else if (event.target.name === 'phoneNumber') {
            setPhoneNumber(event.target.value);
        } else if (event.target.name === 'birthdate') {
            setBirthdate(event.target.value);
        }
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    async function onSubmit(data) {
        const updateData = {
            email: email,
            login: login,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            birthdate: birthdate
        }
        const url = new URL(`${API_BASE}/account/update-profile`);
        try {
            let jwtToken = localStorage.getItem("token");
            const response = await axios.post(url.toString(), updateData, {

                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                auth.setUpdateData(prevState => !prevState);
                enqueueSnackbar(`Profile data successfully updated!`, {
                    variant: "success",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            }
        } catch (error) {
            enqueueSnackbar(`Something went wrong. Please try again later!`, {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        }
    }


    async function onChangeAvatar(event) {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        console.log(formData.get("file"))
        const url = new URL(`${API_BASE}/account/uploadAvatar/${auth.user.id}`);
        // url.searchParams.set("picture", formData);
        try {
            let jwtToken = localStorage.getItem("token");
            const response = await axios.post(url.toString(), formData, {

                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.status === 200) {
                console.log(response.data)
                auth.setUpdateData(prevState => !prevState);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function onChangeAchievementPicture(event) {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        console.log(formData.get("file"))
        setFile(formData);
        // const url = new URL(`${API_BASE}/achievements/uploadPicture/${achievement?.id}`);
        // // url.searchParams.set("picture", formData);
        // try {
        //     let jwtToken = localStorage.getItem("token");
        //     const response = await axios.post(url.toString(), formData, {
        //
        //         headers: {
        //             Authorization: `Bearer ${jwtToken}`,
        //             'Content-Type': 'multipart/form-data'
        //         },
        //     });
        //     if (response.status === 200) {
        //         auth.setUpdateData(prevState => !prevState);
        //         setAchievement(response.data)
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    }


    async function onSubmitAchievement() {
        const url = new URL(`${API_BASE}/achievements/with-file`);
        url.searchParams.set("portfolio_id", 1);
        const data = {
            name: achievementName,
            receivedDate: achievementDate,
        }
        var formData = new FormData();
        formData.append("multipartFile", file.get("file"))
        formData.append("data", JSON.stringify(data))

        // url.searchParams.set("data", data);
        try {
            let jwtToken = localStorage.getItem("token");
            const response = await axios.post(url.toString(),formData, {

                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            if (response.status === 201) {
                auth.setUpdateData(prevState => !prevState);
                setMyAchievements(prevState => [...prevState, response.data])
                setAchievementDate(null)
                setAchievementName('')
                setOpenAchievementDialog(false)
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if (auth.user !== null) {
            setLogin(auth.user.login)
            setFirstName(auth.user.firstName)
            setLastName(auth.user.lastName)
            setEmail(auth.user.email)
            setBirthdate(auth.user.birthdate)
            setPhoneNumber(auth.user.phoneNumber)
        }
        if(auth.avatar !== null){
            fetchPortfolio()
            fetchSchools()
            fetchLanguages()


        }
    }, [auth.user, auth.avatar, auth.updateData])



    async function fetchSchools() {
        try {
            const url = new URL(`${API_BASE}/schools`);
            const response = await axios.get(url.toString());
            if (response.status === 200) {
                setSchools(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchPortfolio() {
        try {
            const url = new URL(`${API_BASE}/portfolios/user/${auth.user.id}`);
            let jwtToken = localStorage.getItem("token");
            const response = await axios.get(url.toString(),{
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            if (response.status === 200) {
                setPortfolio(response.data)
                setMyLanguages(response.data.languages)
                setMySchools(response.data.schools)
                setAboutMe(response.data.aboutMe)
                let count = hobbyCounter
                let arr = []
                if(response.data.hobby!==null && response.data.hobby!==''){
                    arr = response.data.hobby.split(",").map(chip => {
                        count = count+1
                        return {key: count,label: chip}
                    })
                }
                console.log(arr)
                setGender(response.data.gender)
                setChipData(arr)
                setHobbyCounter(count+1)
                fetchAchievements(response.data.id)
                defineProgress(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchAchievements(id) {
        try {
            const url = new URL(`${API_BASE}/achievements/portfolio/${id}`);
            let jwtToken = localStorage.getItem("token");
            const response = await axios.get(url.toString(),{
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            if (response.status === 200) {
                setMyAchievements(response.data)
                if(response.data.length!==0){
                    setPortfolioProgress(prevState => prevState+10)
                    console.log("myAchievements")
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchLanguages() {
        try {
            const url = new URL(`${API_BASE}/languages`);
            const response = await axios.get(url.toString());
            if (response.status === 200) {
                setLanguages(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function savePortfolio() {
        const hobbies = []
        chipData.forEach(chip=>{
            hobbies.push(chip.label)
        })
        const data = {
            portfolio : {
                id: portfolio?.id,
                gender: gender,
                hobby: hobbies.join(","),
                aboutMe: aboutMe,
                appUser: portfolio.appUser,
                languages: myLanguages,
                schools: mySchools,
            },
            userAccountDto:  {
                email: email,
                login: login,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                birthdate: birthdate
            }
        }
        try {
            const url = new URL(`${API_BASE}/portfolios/save`);
            let jwtToken = localStorage.getItem("token");
            const response = await axios.post(url.toString(),data,{
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            if (response.status === 200) {
                auth.setUpdateData(prevState => !prevState);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box display={"flex"} justifyContent={"center"} style={{padding:"20px",backgroundColor: "rgb(242, 245, 249)"}}>
        <Grid container xs={11} display={"flex"} justifyContent={"space-between"}>
            <Head state={state} setState={setState} setGenerate={setGenerate} generate={generate}/>
            <Grid item xs={8}>
                <Paper style={{
                    boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
                    padding: "25px 30px",
                    borderRadius: 12,
                    margin: "15px 0",
                }}>
                    <Grid container display={"flex"} flexDirection={"row"}>
                        <Show>
                            <Show.When isTrue={state === 0}>
                        <Grid item xs={12} mb={2}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 23,
                                            fontWeight: "bold",
                                        }}>Personal Information</Typography>
                        </Grid>


                        <Grid item xs={12} mb={1} container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                            <Grid item xs={3} display={"flex"}>
                                <Box>
                                    <Badge
                                        overlap="rectangular"
                                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                        badgeContent={
                                            <label htmlFor="icon-button-file">
                                                <form >
                                                    <Input onChange={onChangeAvatar} accept="image/*"  id="icon-button-file"
                                                           type="file"/>
                                                    <IconButton type={"submit"} style={{
                                                        backgroundColor: "#604BE8",
                                                        color: "white"
                                                    }} size={"large"} aria-label="upload picture" component="span">
                                                        <PhotoCamera/>
                                                    </IconButton>
                                                </form>
                                            </label>
                                        }
                                    >
                                        <Avatar style={{width: "100%",height:"100%", borderRadius:10}} variant={"rounded"} alt="Travis Howard"
                                                src={auth.avatar !== null ? auth.avatar : null}/>
                                    </Badge>
                                </Box>
                            </Grid>
                            <Grid item xs={8.5} container display={"flex"} justifyContent={"space-between"}>
                                <Grid item xs={5.8} marginBottom={1}>
                                    <Typography variant={"h5"} fontFamily={"Inter"}
                                                style={{
                                                    color: "rgb(45, 62, 74)",
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    marginBottom:7,
                                                }}>Login</Typography>
                                    <TextField size={"medium"} InputLabelProps={{style: {margin: "5px"}}}
                                               InputProps={{
                                                   style: {
                                                       borderRadius: 8,
                                                       padding: "5px 5px",
                                                       fontSize: 18
                                                   }
                                               }} inputProps={{readOnly: true}}  {...register("login", {
                                        minLength: {
                                            value: 1,
                                            message: "length must be greater than 0 character"
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "length must be less than 50 character"
                                        }
                                    })} helperText={errors?.login && errors?.login?.message || ' '}
                                               error={!!errors?.login}
                                               value={login} onChange={handleChange} fontFamily={"Inter"}
                                               type={"text"}
                                               fullWidth
                                                variant="outlined"/>
                                </Grid>

                                <Grid item xs={5.8} marginBottom={1}>
                                    <Typography variant={"h5"} fontFamily={"Inter"}
                                                style={{
                                                    color: "rgb(45, 62, 74)",
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    marginBottom:7,
                                                }}>Email</Typography>
                                    <TextField size={"medium"} InputLabelProps={{style: {padding: "5px"}}}
                                               InputProps={{
                                                   style: {
                                                       borderRadius: 8,
                                                       padding: "5px 5px",
                                                       fontSize: 18
                                                   }
                                               }}  {...register("email", {
                                        minLength: {
                                            value: 1,
                                            message: "length must be greater than 0 character"
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "length must be less than 50 character"
                                        }
                                    })} name={'email'} helperText={errors?.email && errors?.email?.message || ' '}
                                               error={!!errors?.email}
                                               value={email} onChange={handleChange} fontFamily={"Inter"}
                                               type={"email"}
                                               fullWidth
                                               id="user_login" variant="outlined"/>
                                </Grid>

                                <Grid item xs={5.8}  marginBottom={1}>
                                    <Typography variant={"h5"} fontFamily={"Inter"}
                                                style={{
                                                    color: "rgb(45, 62, 74)",
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    marginBottom:7,
                                                }}>First Name</Typography>
                                    <TextField size={"medium"} InputLabelProps={{style: {padding: "5px"}}}
                                               InputProps={{
                                                   style: {
                                                       borderRadius: 8,
                                                       padding: "5px 5px",
                                                       fontSize: 18
                                                   }
                                               }}  {...register("firstName", {
                                        minLength: {
                                            value: 1,
                                            message: "length must be greater than 0 character"
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "length must be less than 50 character"
                                        }
                                    })} name={'firstName'}
                                               helperText={errors?.firstName && errors?.firstName?.message || ' '}
                                               error={!!errors?.firstName}
                                               value={firstName} onChange={handleChange} fontFamily={"Inter"}
                                               type={"text"}
                                               fullWidth
                                               variant="outlined"/>
                                </Grid>

                                <Grid item xs={5.8}  marginBottom={1}>
                                    <Typography variant={"h5"} fontFamily={"Inter"}
                                                style={{
                                                    color: "rgb(45, 62, 74)",
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    marginBottom:7,
                                                }}>Last Name</Typography>
                                    <TextField size={"medium"} InputLabelProps={{style: {padding: "5px"}}}
                                               InputProps={{
                                                   style: {
                                                       borderRadius: 8,
                                                       padding: "5px 5px",
                                                       fontSize: 18
                                                   }
                                               }}  {...register("lastName", {
                                        minLength: {
                                            value: 1,
                                            message: "length must be greater than 0 character"
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "length must be less than 50 character"
                                        }
                                    })} name={'lastName'}
                                               helperText={errors?.lastName && errors?.lastName?.message || ' '}
                                               error={!!errors?.lastName}
                                               value={lastName} onChange={handleChange} fontFamily={"Inter"}
                                               type={"text"}
                                               fullWidth
                                               variant="outlined"/>
                                </Grid>

                            </Grid>
                        </Grid>


                        <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                            <Grid item xs={3}  marginBottom={1}>
                                <Typography variant={"h5"} fontFamily={"Inter"}
                                            style={{
                                                color: "rgb(45, 62, 74)",
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                marginBottom:7,
                                            }}>Gender</Typography>
                                <FormControl fullWidth>
                                    <Select size={"medium"}
                                            labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        onChange={handleChangeGender}
                                    >
                                        <MenuItem defaultChecked value={"Men"}>Men</MenuItem>
                                        <MenuItem value={"Women"}>Women</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={8.5} display={"flex"} justifyContent={"space-between"}>
                            <Grid item xs={5.8}  marginBottom={1}>
                                <Typography variant={"h5"} fontFamily={"Inter"}
                                            style={{
                                                color: "rgb(45, 62, 74)",
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                marginBottom:7,
                                            }}>Phone Number</Typography>
                                <TextField size={"medium"} InputLabelProps={{style: {padding: "5px"}}}
                                           InputProps={{
                                               style: {
                                                   borderRadius: 8,
                                                   padding: "5px 5px",
                                                   fontSize: 18
                                               }
                                           }}  {...register("phoneNumber", {
                                    pattern: {
                                        value: /^((87)((0[0-9])|(47)|(5[0-1])|(6[0-4])|(7(1|[5-8])))(\d{7}))$/,
                                        message: "Wrong phone number format"
                                    }

                                })}
                                           placeholder={"87771112233"}
                                           name={'phoneNumber'}
                                           helperText={errors?.phoneNumber && errors?.phoneNumber?.message || ' '}
                                           error={!!errors?.phoneNumber}
                                           value={phoneNumber} onChange={handleChange} fontFamily={"Inter"}
                                           type={"number"} fullWidth
                                           variant="outlined"/>
                            </Grid>

                            <Grid item xs={5.8}  marginBottom={1}>
                                <Typography variant={"h5"} fontFamily={"Inter"}
                                            style={{
                                                color: "rgb(45, 62, 74)",
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                marginBottom:7,
                                            }}>Birthdate</Typography>
                                <TextField size={"medium"} InputLabelProps={{style: {padding: "5px"}}}
                                           InputProps={{
                                               style: {
                                                   borderRadius: 8,
                                                   padding: "5px 5px",
                                                   fontSize: 18
                                               }
                                           }}  {...register("birthdate", {})}
                                           name={'birthdate'}
                                           helperText={errors?.birthdate && errors?.birthdate?.message || ' '}
                                           error={!!errors?.birthdate}
                                           value={birthdate} onChange={handleChange} fontFamily={"Inter"}
                                           type={"date"} fullWidth
                                           variant="outlined"/>
                            </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} mb={3}>
                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            marginBottom:7,
                                        }}>Hobbies</Typography>
                                <Button id={"primary_button_outlined"} variant="text" style={{textTransform:"none"}} onClick={handleClickOpen}>
                                    Add
                                </Button>
                                <Dialog maxWidth={"xs"} fullWidth={true} open={open} onClose={handleClose}>
                                    <DialogTitle>Add Hobby</DialogTitle>
                                    <DialogContent>
                                        {/*<DialogContentText>*/}
                                        {/*    To subscribe to this website, please enter your email address here. We*/}
                                        {/*    will send updates occasionally.*/}
                                        {/*</DialogContentText>*/}
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Hobby"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            value={hobby}
                                            onChange={(e)=>setHobby(e.target.value)}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button id={"primary_button"} onClick={handleAddShip}>Add</Button>
                                        <Button id={"warning_button"} onClick={handleClose}>Cancel</Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>

                            <Grid item xs={12} mb={3}>
                                {chipData.map(chip=>{
                                    return  <Chip
                                        size={"medium"}
                                        style={{marginRight:15, marginBottom:15, fontSize:16}}
                                        label={chip.label}
                                        onDelete={handleDelete(chip)}
                                    />
                                })}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant={"h5"} fontFamily={"Inter"}
                                            style={{
                                                color: "rgb(45, 62, 74)",
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                marginBottom:7,
                                            }}>Bio</Typography>
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    value={aboutMe}
                                    onChange={(e)=>setAboutMe(e.target.value)}
                                    fullWidth
                                    placeholder={"Enter a brief description about yourself"}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} mb={2} >
                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                                <Typography variant={"h5"} fontFamily={"Inter"}
                                            style={{
                                                color: "rgb(45, 62, 74)",
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                marginBottom:7,
                                            }}>Schools</Typography>
                                <Button id={"primary_button_outlined"} variant="text" style={{textTransform:"none"}} onClick={handleClickOpenSchoolDialog}>
                                    Add
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    mySchools?.map(school=>{
                                        return  <Grid item container xs={12} display={"flex"} justifyContent={"space-between"} mb={2}>
                                            <Grid item xs={10} alignSelf={"flex-end"}>
                                                <Typography variant={"h5"} fontFamily={"Inter"}
                                                            style={{
                                                                color: "rgb(45, 62, 74)",
                                                                fontSize: 18,
                                                                marginBottom:7,
                                                            }}>{`№ ${school.number} ${school.name}`}</Typography>
                                            </Grid>
                                            <Grid item xs={2} container justifyContent={"flex-end"}>
                                                <IconButton onClick={handleDeleteSchool(school)}>
                                                    <Clear />
                                                </IconButton>
                                            </Grid>
                                        <Grid item xs={12}>
                                            <Divider/>
                                        </Grid>
                                        </Grid>
                                    })
                                }

                            </Grid>

                            <Dialog maxWidth={"sm"} fullWidth={true} open={openSchoolDialog} onClose={handleCloseSchoolDialog}>
                                <DialogTitle>Add School</DialogTitle>
                                <DialogContent>
                                    <Grid container xs={12}>
                                        <FormControl fullWidth>
                                            <Select size={"medium"}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={school}
                                                    onChange={(e)=>setSchool(e.target.value)}
                                            >
                                                {
                                                    schools?.map(school=>{
                                                        return <MenuItem defaultChecked value={school}>
                                                            {school?.number} {school?.name}
                                                        </MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button id={"primary_button"} onClick={handleAddSchool}>Add</Button>
                                    <Button id={"warning_button"} onClick={handleCloseSchoolDialog}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>


                    {/* Start Languages   */}
                        <Grid item xs={12} mb={2} >
                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                                <Typography variant={"h5"} fontFamily={"Inter"}
                                            style={{
                                                color: "rgb(45, 62, 74)",
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                marginBottom:7,
                                            }}>Languages</Typography>
                                <Button id={"primary_button_outlined"} variant="text" style={{textTransform:"none"}} onClick={handleClickOpenLanguageDialog}>
                                    Add
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    myLanguages?.map(language=>{
                                        return  <Grid item container xs={12} display={"flex"} justifyContent={"space-between"} mb={2}>
                                            <Grid item xs={10} alignSelf={"flex-end"}>
                                                <Typography variant={"h5"} fontFamily={"Inter"}
                                                            style={{
                                                                color: "rgb(45, 62, 74)",
                                                                fontSize: 18,
                                                                marginBottom:7,
                                                            }}>{`№ ${language.language} - ${language.level}`}</Typography>
                                            </Grid>
                                            <Grid item xs={2} container justifyContent={"flex-end"}>
                                                <IconButton onClick={handleDeleteLanguage(language)}>
                                                    <Clear />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider/>
                                            </Grid>
                                        </Grid>
                                    })
                                }

                            </Grid>

                            <Dialog maxWidth={"sm"} fullWidth={true} open={openLanguageDialog} onClose={handleClickCloseLanguageDialog}>
                                <DialogTitle>Add Language</DialogTitle>
                                <DialogContent>
                                    <Grid container xs={12}>
                                        <FormControl fullWidth>
                                            <Select size={"medium"}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={language}
                                                    onChange={(e)=>setLanguage(e.target.value)}
                                            >
                                                {
                                                    languages?.map(language=>{
                                                        return <MenuItem defaultChecked value={language}>
                                                            {language?.language} - {language?.level}
                                                        </MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button id={"primary_button"} onClick={handleAddLanguage}>Add</Button>
                                    <Button id={"warning_button"} onClick={handleClickCloseLanguageDialog}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    {/* End Languages   */}

                    {/* Start Achievement */}
                        <Grid item xs={12} mb={2} >
                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                                <Typography variant={"h5"} fontFamily={"Inter"}
                                            style={{
                                                color: "rgb(45, 62, 74)",
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                marginBottom:7,
                                            }}>Achievements</Typography>
                                <Button id={"primary_button_outlined"} variant="text" style={{textTransform:"none"}} onClick={handleClickOpenAchievementDialog}>
                                    Add
                                </Button>
                            </Grid>
                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                                {
                                    myAchievements?.map(ach=>{
                                        return  <Grid item container display={"flex"} xs={5.8}>
                                            <Achievement achievement={ach}/>
                                        </Grid>
                                    })
                                }

                            </Grid>

                            <Dialog maxWidth={"md"} fullWidth={true} open={openAchievementDialog} onClose={handleCloseAchievementDialog}>
                                <DialogTitle>Add Achievement</DialogTitle>
                                <DialogContent>
                                    <Grid container xs={12} display={"flex"} justifyContent={"space-between"}>
                                        <Grid item xs={12} mb={3}>
                                            <Typography variant={"h5"} fontFamily={"Inter"}
                                                        style={{
                                                            color: "rgb(45, 62, 74)",
                                                            fontSize: 18,
                                                            fontWeight: "bold",
                                                            marginBottom:7,
                                                        }}>Name</Typography>
                                            <TextField size={"medium"} InputLabelProps={{style: {padding: "5px"}}}
                                                       InputProps={{
                                                           style: {
                                                               borderRadius: 8,
                                                               padding: "5px 5px",
                                                               fontSize: 18
                                                           }
                                                       }}
                                                       value={achievementName} onChange={(e)=>setAchievementName(e.target.value)} fontFamily={"Inter"}
                                                       type={"text"}
                                                       fullWidth
                                                       variant="outlined"/>
                                        </Grid>

                                        <Grid item xs={12} marginBottom={3}>
                                            <Typography variant={"h5"} fontFamily={"Inter"}
                                                        style={{
                                                            color: "rgb(45, 62, 74)",
                                                            fontSize: 18,
                                                            fontWeight: "bold",
                                                            marginBottom:7,
                                                        }}>Date</Typography>
                                            <TextField size={"medium"} InputLabelProps={{style: {padding: "5px"}}}
                                                       InputProps={{
                                                           style: {
                                                               borderRadius: 8,
                                                               padding: "5px 5px",
                                                               fontSize: 18
                                                           }
                                                       }}
                                                       value={achievementDate} onChange={(e)=>setAchievementDate(e.target.value)} fontFamily={"Inter"}
                                                       type={"date"} fullWidth
                                                       variant="outlined"/>
                                        </Grid>
                                        <Grid item xs={12} marginBottom={1}>
                                            <Typography variant={"h5"} fontFamily={"Inter"}
                                                        style={{
                                                            color: "rgb(45, 62, 74)",
                                                            fontSize: 18,
                                                            fontWeight: "bold",
                                                            marginBottom:7,
                                                        }}>Image</Typography>
                                            <input onChange={onChangeAchievementPicture} accept="image/*"  id="icon-button-file" type="file"/>

                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button id={"primary_button"} onClick={onSubmitAchievement}>Add</Button>
                                    <Button id={"warning_button"} onClick={handleCloseAchievementDialog}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    {/* End Achievement */}

                        <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
                            <Button id={"primary_button"} onClick={savePortfolio}>Save</Button>
                        </Grid>
                            </Show.When>
                            <Show.Else>
                                <ChangePassword/>
                                <Report setGenerate={setGenerate} generate={generate} portfolio={portfolio} myHobbies={chipData} myAchievements={myAchievements}/>
                            </Show.Else>
                        </Show>
                    </Grid>

                </Paper>
            </Grid>
            <Grid item xs={3.8}>
                <Paper style={{
                    boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
                    padding: "25px 30px",
                    borderRadius: 12,
                    margin: "15px 0",
                }}>
                    <Grid container xs={12} display={"flex"} flexDirection={"row"}>
                        <Grid item xs={5}>
                            <FacebookCircularProgress progress={portfolioProgress}/>
                        </Grid>
                        <Grid item xs={7}>
                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"} mb={1}>
                                <Typography style={{
                                    fontFamily:"Inter",
                                    fontSize:16,
                                    color: firstName === '' && lastName === '' ? "rgba(34, 51, 84, 0.7)" : "rgb(45, 62, 74)"
                                }}>
                                    Add a fullname
                                </Typography>
                                <Show>
                                    <Show.When isTrue={firstName !== '' && lastName!==''}>
                                        <CheckCircle style={{color:"rgb(87, 202, 34)"}}/>
                                    </Show.When>
                                    <Show.Else>
                                        <DoNotDisturbOn style={{color:"rgb(255, 25, 67)"}}/>
                                    </Show.Else>
                                </Show>
                            </Grid>
                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"} mb={1}>
                                <Typography style={{
                                    fontFamily:"Inter",
                                    fontSize:16,
                                    color: auth.avatar === '' ? "rgba(34, 51, 84, 0.7)" : "rgb(45, 62, 74)"
                                }}>
                                    Add a picture of you
                                </Typography>
                                <Show>
                                    <Show.When isTrue={auth.avatar !== ''}>
                                        <CheckCircle style={{color:"rgb(87, 202, 34)"}}/>
                                    </Show.When>
                                    <Show.Else>
                                        <DoNotDisturbOn style={{color:"rgb(255, 25, 67)"}}/>
                                    </Show.Else>
                                </Show>
                            </Grid>
                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"} mb={1}>
                                <Typography style={{
                                    fontFamily:"Inter",
                                    fontSize:16,
                                    color: phoneNumber === '' ? "rgba(34, 51, 84, 0.7)" : "rgb(45, 62, 74)"
                                }}>
                                    Add a phone number
                                </Typography>
                                <Show>
                                    <Show.When isTrue={phoneNumber !== ''}>
                                        <CheckCircle style={{color:"rgb(87, 202, 34)"}}/>
                                    </Show.When>
                                    <Show.Else>
                                        <DoNotDisturbOn style={{color:"rgb(255, 25, 67)"}}/>
                                    </Show.Else>
                                </Show>
                            </Grid>

                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"} mb={1}>
                                <Typography style={{
                                    fontFamily:"Inter",
                                    fontSize:16,
                                    color: birthdate === '' ? "rgba(34, 51, 84, 0.7)" : "rgb(45, 62, 74)"
                                }}>
                                    Add a birthdate
                                </Typography>
                                <Show>
                                    <Show.When isTrue={birthdate !== ''}>
                                        <CheckCircle style={{color:"rgb(87, 202, 34)"}}/>
                                    </Show.When>
                                    <Show.Else>
                                        <DoNotDisturbOn style={{color:"rgb(255, 25, 67)"}}/>
                                    </Show.Else>
                                </Show>
                            </Grid>

                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"} mb={1}>
                                <Typography style={{
                                    fontFamily:"Inter",
                                    fontSize:16,
                                    color: gender === '' ? "rgba(34, 51, 84, 0.7)" : "rgb(45, 62, 74)"
                                }}>
                                    Add a gender
                                </Typography>
                                <Show>
                                    <Show.When isTrue={gender !== ''}>
                                        <CheckCircle style={{color:"rgb(87, 202, 34)"}}/>
                                    </Show.When>
                                    <Show.Else>
                                        <DoNotDisturbOn style={{color:"rgb(255, 25, 67)"}}/>
                                    </Show.Else>
                                </Show>
                            </Grid>

                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"} mb={1}>
                                <Typography style={{
                                    fontFamily:"Inter",
                                    fontSize:16,
                                    color: chipData.length === 0 ? "rgba(34, 51, 84, 0.7)" : "rgb(45, 62, 74)"
                                }}>
                                    Add a hobby
                                </Typography>
                                <Show>
                                    <Show.When isTrue={chipData.length !== 0}>
                                        <CheckCircle style={{color:"rgb(87, 202, 34)"}}/>
                                    </Show.When>
                                    <Show.Else>
                                        <DoNotDisturbOn style={{color:"rgb(255, 25, 67)"}}/>
                                    </Show.Else>
                                </Show>
                            </Grid>

                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"} mb={1}>
                                <Typography style={{
                                    fontFamily:"Inter",
                                    fontSize:16,
                                    color: aboutMe === '' ? "rgba(34, 51, 84, 0.7)" : "rgb(45, 62, 74)"
                                }}>
                                    Add a bio
                                </Typography>
                                <Show>
                                    <Show.When isTrue={aboutMe !== ''}>
                                        <CheckCircle style={{color:"rgb(87, 202, 34)"}}/>
                                    </Show.When>
                                    <Show.Else>
                                        <DoNotDisturbOn style={{color:"rgb(255, 25, 67)"}}/>
                                    </Show.Else>
                                </Show>
                            </Grid>

                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"} mb={1}>
                                <Typography style={{
                                    fontFamily:"Inter",
                                    fontSize:16,
                                    color: mySchools.length === 0 ? "rgba(34, 51, 84, 0.7)" : "rgb(45, 62, 74)"
                                }}>
                                    Add a schools
                                </Typography>
                                <Show>
                                    <Show.When isTrue={mySchools.length !== 0}>
                                        <CheckCircle style={{color:"rgb(87, 202, 34)"}}/>
                                    </Show.When>
                                    <Show.Else>
                                        <DoNotDisturbOn style={{color:"rgb(255, 25, 67)"}}/>
                                    </Show.Else>
                                </Show>
                            </Grid>

                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"} mb={1}>
                                <Typography style={{
                                    fontFamily:"Inter",
                                    fontSize:16,
                                    color: myLanguages.length === 0 ? "rgba(34, 51, 84, 0.7)" : "rgb(45, 62, 74)"
                                }}>
                                    Add a languages
                                </Typography>
                                <Show>
                                    <Show.When isTrue={myLanguages.length !== 0}>
                                        <CheckCircle style={{color:"rgb(87, 202, 34)"}}/>
                                    </Show.When>
                                    <Show.Else>
                                        <DoNotDisturbOn style={{color:"rgb(255, 25, 67)"}}/>
                                    </Show.Else>
                                </Show>
                            </Grid>

                            <Grid item xs={12} container display={"flex"} justifyContent={"space-between"} mb={1}>
                                <Typography style={{
                                    fontFamily:"Inter",
                                    fontSize:16,
                                    color: myAchievements.length === 0 ? "rgba(34, 51, 84, 0.7)" : "rgb(45, 62, 74)"
                                }}>
                                    Add a achievements
                                </Typography>
                                <Show>
                                    <Show.When isTrue={myAchievements.length !== 0}>
                                        <CheckCircle style={{color:"rgb(87, 202, 34)"}}/>
                                    </Show.When>
                                    <Show.Else>
                                        <DoNotDisturbOn style={{color:"rgb(255, 25, 67)"}}/>
                                    </Show.Else>
                                </Show>
                            </Grid>

                        </Grid>
                    </Grid>

                </Paper>

                <Paper style={{
                    boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
                    padding: "25px 20px",
                    borderRadius: 12,
                    margin: "15px 0",
                    backgroundColor:"#604BE8"
                }}>
                <Grid container display={"flex"} flexDirection={"row"}>
                    <Grid item xs={2}>
                        <img width={"80%"} src={"https://cdn-user-icons.flaticon.com/28161/28161454/1654602920665.svg?token=exp=1654603821~hmac=b6dd2781c73e0ba5068f1e064b81350e"}/>
                    </Grid>
                    <Grid item xs={8} container display={"flex"} flexDirection={"column"}>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "white",
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        marginBottom:10,
                                    }}>
                            Take the test and get to know your professional orientation
                        </Typography>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "#C3CDE4",
                                        fontSize: 14,
                                        fontWeight: "bold",
                                    }}>
                            Click the button to start your survey
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={()=>navigate("/tests/1")} size="large" style={{border:"1xp solid white"}}>
                            <ArrowForwardIos fontSize="inherit" style={{color:"white"}} />
                        </IconButton>
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
        </Grid>
        </Box>
    );
}

export default Portfolio;