import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../AuthConfig/useAuth";
import {Headers} from "../../Components/header/Headers";
import {Container, createTheme, Grid, TextField} from "@mui/material";
import {ReactComponent as Main} from '../../images/registration.svg'
import Typography from "@mui/material/Typography";
import {ReactComponent as Logo} from '../../logo.svg';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {default as axios} from "axios";
import {API_BASE} from "../../Constants/Constants";
import '../../Constants/buttons.scss'

function SignUp() {
    const { register, handleSubmit, watch, formState: { errors, isSubmitSuccessful }, reset, } = useForm({mode:"onBlur"});
    const { enqueueSnackbar } = useSnackbar();

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const from = location.state?.from?.pathname || "/";

    const handleLoginChange = event => {
        setLogin(event.target.value);
    }

    const handleEmailChange = event => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const handlePasswordConfirmChange = event => {
        setPasswordConfirm(event.target.value);
    }

    const onSubmitRegistration = data => {
        if(data.password !== data.passwordConfirm){
            enqueueSnackbar("The password are not the same!", {variant:"error"});
        }else {
            registraion(data);
        }
    }

    async function registraion(userData) {
        try {
            const response = await axios.post(`${API_BASE}/account/registration`,userData);
            if(response.status === 201){
                enqueueSnackbar("Account created successfully! Check your mail to activate account!", {variant:"success"});
                setEmail('')
                setPasswordConfirm('')
                setLogin('')
                setPassword('')
            }
            console.error(response);
        } catch (error) {
            console.error(error);

            enqueueSnackbar("Something went wrong! Please try again!", {variant:"error"});
        }
    }

    return (
        <>

            <Box style={{minHeight:window.innerHeight*0.8}}>
                <Grid container display={"flex"} justifyContent={"center"} style={{display: "flex", paddingLeft: 0, paddingRight: 0, height: "100%"}}>

                    <Grid container item xs={12} sm={8} md={6} lg={5} xl={4} style={{padding: 0, paddingLeft: 25, paddingRight: 25, paddingTop:20}}
                          flexDirection={"column"}
                          justifyContent={"space-evenly"} spacing={0} alignItems={"center"}>

                        <Grid
                            container
                            item
                            direction="column"
                            alignItems="flex-start"
                            style={{margin: 0}}>
                            <Typography variant={"body1"} component={"p"} fontFamily={"Inter"} style={{color: " rgb(103, 119, 136)"}}>SIGN UP</Typography>
                            <Typography variant={"h4"} fontSize={30} fontWeight={700} style={{color:"rgb(45, 55, 72)"}} fontFamily={"Inter"}>Create an account</Typography>
                            <Typography variant={"body1"} component={"p"} style={{color: " rgb(103, 119, 136)"}} fontFamily={"Inter"}>Fill out the form to get started.</Typography>
                        </Grid>
                        <Grid item container direction="row"
                              justifyContent="flex-start"
                              alignItems={"flex-start"}>
                            <form style={{width: "100%"}} onSubmit={handleSubmit(onSubmitRegistration)}>
                                <Grid item>
                                    <Grid container direction={"column"} justifyContent={"space-between"}>
                                        <Typography marginBottom={1} variant={"subtitle2"} component={"p"} fontFamily={"Inter"}>Login</Typography>
                                        <TextField {...register("login", {
                                            required: 'Login field is required',
                                            minLength:{
                                                value:1,
                                                message:"length must be greater than 0 character"
                                            },
                                            maxLength:{
                                                value:50,
                                                message:"length must be less than 50 character"
                                            }
                                        })}  helperText={errors?.login && errors?.login?.message || ' '} error={!!errors?.login} value={login} onChange={handleLoginChange} fontFamily={"Inter"} type={"text"} id="user_login" label="Your login" variant="outlined"/>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                <Grid container direction={"column"} justifyContent={"space-between"}>
                                    <Typography marginBottom={1} variant={"subtitle2"} component={"p"} fontFamily={"Inter"}>Email</Typography>
                                    <TextField {...register("email", {
                                        required: 'Email field is required',
                                        minLength:{
                                            value:5,
                                            message:"length must be greater than 4 character"
                                        },
                                        maxLength:{
                                            value:254,
                                            message:"length must be less than 253 character"
                                        }
                                    })} helperText={errors?.email && errors?.email?.message || ' '} error={!!errors?.email} value={email} onChange={handleEmailChange} type={"email"} id="user_email" label="Your email" variant="outlined"/>
                                </Grid>
                                </Grid>

                                <Grid container direction={"column"} justifyContent={"space-between"}>
                                    <Typography marginBottom={1} variant={"subtitle2"} component={"p"} fontFamily={"Inter"}>New password</Typography>
                                    <TextField {...register("password", {
                                        required: 'Password field is required',
                                        minLength:{
                                            value:4,
                                            message:"length must be greater than 3 character"
                                        },
                                        maxLength:{
                                            value:99,
                                            message:"length must be less than 100 character"
                                        }
                                    })} helperText={errors?.password && errors?.password?.message || ' '} type={"password"} error={!!errors?.password} value={password} onChange={handlePasswordChange} id="user_password" label="New password" variant="outlined"/>
                                </Grid>

                                <Grid container direction={"column"} justifyContent={"space-between"}>
                                    <Typography marginBottom={1} variant={"subtitle2"} component={"p"} fontFamily={"Inter"}>New password confirmation</Typography>
                                    <TextField {...register("passwordConfirm", {
                                        required: 'Password Confirmation field is required',
                                        minLength:{
                                            value:4,
                                            message:"length must be greater than 3 character"
                                        },
                                        maxLength:{
                                            value:99,
                                            message:"length must be less than 100 character"
                                        }
                                    })} helperText={errors?.passwordConfirm && errors?.passwordConfirm?.message || ' '} type={"password"} error={!!errors?.passwordConfirm} value={passwordConfirm} onChange={handlePasswordConfirmChange} id="user_confirm_password" label="Confirm the new password" variant="outlined"/>
                                </Grid>

                                <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography variant={"subtitle2"} component={"h6"} fontFamily={"Inter"}>Already have an account?
                                        <Link style={{textDecoration: "none", color: "rgb(55, 125, 255)"}} to="/sign-in"> Login.</Link>
                                    </Typography>
                                    <Button type={"submit"} id={"primary_button"} variant="contained" fontFamily={"Inter"}>Sign Up</Button>
                                </Grid>
                            </form>
                        </Grid>

                    </Grid>


                    <Grid container item xs={12} sm={12} md={6} lg={6} xl={6} style={{padding: 20}} justifyContent={"center"} alignItems={"center"}>
                        <Main/>
                    </Grid>

                </Grid>
            </Box>
        </>

    );
}

export default SignUp;
