import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../AuthConfig/useAuth";
import {Headers} from "../../Components/header/Headers";
import {Checkbox, Container, createTheme, Grid, TextField} from "@mui/material";
import {ReactComponent as Main} from '../../images/undraw_check_boxes_re_v40f.svg'
import Typography from "@mui/material/Typography";
import {ReactComponent as Logo} from '../../logo.svg';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useForm} from "react-hook-form";

function SignIn() {

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Nunito',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                'Inter',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
    });


    const { register, handleSubmit, watch, formState: { errors } } = useForm({mode:"onBlur"});

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const from = location.state?.from?.pathname || "/";

    const handleEmailChange = event =>{
        setEmail(event.target.value)
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value)
    }

    const handleRememberMeChange = () =>{
        // eslint-disable-next-line no-unused-expressions
        setRememberMe(!rememberMe)
    }

    function handleLoginSubmit(data) {
        const userData = {
            username: data.email,
            password: data.password,
            rememberMe: data.rememberMe
        }
        auth.signin(userData, () => {
            navigate(from, {replace: true});
        });
    }

    return (
        <>

            <Box style={{height: "650px"}}>
                <Headers/>
                <Container maxWidth="xl" style={{display: "flex", paddingLeft: 0, paddingRight: 0, height: "100%"}}>
                    <Grid item xs={1}/>
                    <Grid container item xs={5} style={{padding: 0, paddingLeft: 25, paddingRight: 25}}
                          flexDirection={"column"}
                          justifyContent={"space-evenly"} spacing={0} alignItems={"center"}>
                        <Grid/>
                        <Grid/>
                        <Grid
                            container
                            item
                            direction="column"
                            alignItems="flex-start"
                            style={{margin: 0}}
                        >
                            <Typography variant={"body1"} component={"p"}
                                        style={{color: " rgb(103, 119, 136)"}}>LOGIN</Typography>
                            <Typography variant={"h4"} fontFamily={"Inter"} component={"h4"} sx={{fontFamily:theme.typography.fontFamily}}
                                        style={{fontWeight: "bold"}}>Welcome back</Typography>
                            <Typography variant={"body1"} component={"p"} style={{color: " rgb(103, 119, 136)"}}>Login
                                to manage your account.</Typography>
                        </Grid>
                        <Grid item container direction="row"
                              justifyContent="flex-start"
                              alignItems={"flex-start"}

                        >
                            <form style={{width: "100%"}} onSubmit={handleSubmit(handleLoginSubmit)}>

                                <Grid container direction={"column"} justifyContent={"space-between"} marginBottom={2}>
                                    <Typography  marginBottom={1} variant={"subtitle2"} component={"p"}>Enter your email</Typography>
                                    <TextField{...register("email", {
                                        required: 'Email field is required',
                                        minLength:{
                                            value:2,
                                            message:"length must be greater than 1 character"
                                        },
                                        maxLength:{
                                            value:50,
                                            message:"length must be less than 50 character"
                                        }
                                    })} helperText={errors?.email && errors?.email?.message || ' '} error={!!errors?.email} id={"user_email"} value={email} onChange={handleEmailChange} type={"text"} label="Email" variant="outlined"/>
                                </Grid>

                                <Grid container direction={"column"} justifyContent={"space-between"}>
                                    <Grid container direction={"row"} justifyContent={"space-between"} marginBottom={1}>
                                        <Typography variant={"subtitle2"} component={"p"}>Enter your password</Typography>
                                        <Typography variant={"subtitle2"} component={"h6"}>
                                            <Link style={{textDecoration: "none", color: "rgb(55, 125, 255)"}} to="/forgot-password">Forgot your password?</Link>
                                        </Typography>
                                    </Grid>
                                    <TextField {...register("password", {
                                        required: 'Password field is required',
                                        minLength:{
                                            value:4,
                                            message:"length must be greater than 3 character"
                                        },
                                        maxLength:{
                                            value:50,
                                            message:"length must be less than 50 character"
                                        }
                                    })} helperText={errors?.password && errors?.password?.message || ' '} error={!!errors?.password} id="user_password" value={password} onChange={handlePasswordChange} label="Password" variant="outlined"/>
                                </Grid>

                                <Grid container direction={"row"} marginBottom={2}>

                                    <Checkbox {...register("rememberMe")}
                                        style={{padding:0}}
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Typography alignSelf={"center"} variant={"subtitle2"} component={"p"} style={{marginLeft:5}}>Remember me</Typography>
                                </Grid>

                                <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography variant={"subtitle2"} component={"h6"}>Don't have an account yet?
                                        <Link style={{textDecoration: "none", color: "rgb(55, 125, 255)"}} to="/sign-up"> Sign up here.</Link>
                                    </Typography>
                                    <Button type={"submit"} style={{backgroundColor: "rgb(66, 125, 255)"}} variant="contained">Login</Button>
                                </Grid>

                            </form>
                        </Grid>
                        <Grid/>
                        <Grid/>
                    </Grid>
                    <Grid container item xs={6} style={{padding: 0}} justifyContent={"center"} alignItems={"center"}>
                        <Main/>
                    </Grid>

                </Container>
            </Box>
        </>

    );
}

export default SignIn;
