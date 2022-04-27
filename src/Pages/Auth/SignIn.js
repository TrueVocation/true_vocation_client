import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../AuthConfig/useAuth";
import {Headers} from "../../Components/header/Headers";
import {Checkbox, Container, Grid, TextField} from "@mui/material";
import {ReactComponent as Main} from '../../images/undraw_authentication_re_svpt.svg'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useForm} from "react-hook-form";

function SignIn() {


    const { register, handleSubmit, watch, formState: { errors } } = useForm({mode:"onBlur"});

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [values, setValues] = useState({showPassword: false})

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const from = location.state?.from?.pathname || "/";

    const handleLoginChange = event =>{
        setLogin(event.target.value)
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value)
    }

    const handleRememberMeChange = () =>{
        // eslint-disable-next-line no-unused-expressions
        setRememberMe(!rememberMe)
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    function handleLoginSubmit(data) {
        const userData = {
            username: data.login,
            password: data.password,
            rememberMe: data.rememberMe
        }
        auth.signin(userData, () => {
            navigate(from, {replace: true});
        });
    }

    return (
        <>
            <Box style={{height:window.innerHeight*0.8}}>
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
                            <Typography variant={"body1"} component={"p"} fontFamily={"Inter"} style={{color: "rgb(103, 119, 136)"}}>LOGIN</Typography>
                            <Typography variant={"h4"} fontFamily={"Inter"} component={"h4"} style={{fontWeight: "700", color:"#2d3e4a"}}>Welcome back</Typography>
                            <Typography variant={"body1"} component={"p"} style={{color: " rgb(103, 119, 136)"}} fontFamily={"Inter"}>Login to manage your account.</Typography>
                        </Grid>
                        <Grid item container direction="row"
                              justifyContent="flex-start"
                              alignItems={"flex-start"}>
                            <form style={{width: "100%"}} onSubmit={handleSubmit(handleLoginSubmit)}>

                                <Grid container direction={"column"} justifyContent={"space-between"} marginBottom={2}>
                                    <Typography  marginBottom={1} variant={"subtitle2"} component={"p"} fontFamily={"Inter"}>Enter your login</Typography>
                                    <TextField{...register("login", {
                                        required: 'Login field is required',
                                        minLength:{
                                            value:2,
                                            message:"length must be greater than 1 character"
                                        },
                                        maxLength:{
                                            value:50,
                                            message:"length must be less than 50 character"
                                        }
                                    })} helperText={errors?.login && errors?.login?.message || ' '} error={!!errors?.login} id={"user_email"} value={login} onChange={handleLoginChange} type={"text"} label="Login" variant="outlined"/>
                                </Grid>

                                <Grid container direction={"column"} justifyContent={"space-between"}>
                                    <Grid container direction={"row"} justifyContent={"space-between"} marginBottom={1}>
                                        <Typography variant={"subtitle2"} component={"p"} fontFamily={"Inter"}>Enter your password</Typography>
                                        <Typography variant={"subtitle2"} component={"h6"} fontFamily={"Inter"}>
                                            <Link style={{textDecoration: "none", color: "rgb(55, 125, 255)"}} to="/reset-password">Forgot your password?</Link>
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
                                    })} helperText={errors?.password && errors?.password?.message || ' '} error={!!errors?.password} id="user_password" type={"password"} value={password} onChange={handlePasswordChange} label="Password" variant="outlined"/>
                                </Grid>

                                <Grid container direction={"row"} marginBottom={2}>
                                    <Checkbox {...register("rememberMe")}
                                        style={{padding:0}}
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Typography alignSelf={"center"} variant={"subtitle2"} component={"p"} style={{marginLeft:5}} fontFamily={"Inter"}>Remember me</Typography>
                                </Grid>

                                <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography variant={"subtitle2"} component={"h6"} fontFamily={"Inter"}>Don't have an account yet?
                                        <Link style={{textDecoration: "none", color: "rgb(55, 125, 255)",fontFamily:"Inter"}} to="/sign-up"> Sign up here.</Link>
                                    </Typography>
                                    <Button id={"primary_button"}  size={"large"} type={"submit"} variant="contained" fontFamily={"Inter"}>Login</Button>
                                </Grid>

                            </form>
                        </Grid>
                        <Grid/>
                        <Grid/>
                    </Grid>
                    <Grid container item xs={6} style={{padding: 20}} justifyContent={"center"} alignItems={"center"}>
                        <Main/>
                    </Grid>

                </Container>
            </Box>
        </>

    );
}

export default SignIn;
