import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../AuthConfig/useAuth";
import {Headers} from "../../Components/header/Headers";
import {Container, Grid, TextField} from "@mui/material";
import {ReactComponent as Main} from '../../images/undraw_check_boxes_re_v40f.svg'
import Typography from "@mui/material/Typography";
import {ReactComponent as Logo} from '../../logo.svg';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {default as axios} from "axios";
import {API_BASE} from "../../Constants/Constants";

function SignUp() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({mode:"onBlur"});
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
            const response = await axios.post(`${API_BASE}/account/register`,userData);
            if(response.status === 201){
                enqueueSnackbar("Account created successfully!", {variant:"success"});
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <Box height={"650px"}>
                <Headers/>
                <Container maxWidth="xl" style={{display: "flex", paddingLeft: 0, paddingRight: 0, height: "100%"}}>
                    <Grid item xs={1}/>
                    <Grid container item xs={5} style={{padding: 0, paddingLeft: 25, paddingRight: 25}}
                          flexDirection={"column"}
                          justifyContent={"space-evenly"} spacing={0} alignItems={"center"}>

                        <Grid
                            container
                            item
                            direction="column"
                            alignItems="flex-start"
                            style={{margin: 0}}
                        >
                            <Typography variant={"body1"} component={"p"}
                                        style={{color: " rgb(103, 119, 136)"}}>SIGN UP</Typography>
                            <Typography variant={"h4"} fontFamily={"Inter"} component={"h4"}
                                        style={{fontWeight: "bold"}}>Create an account</Typography>
                            <Typography variant={"body1"} component={"p"} style={{color: " rgb(103, 119, 136)"}}>Fill out the form to get started.</Typography>
                        </Grid>
                        <Grid item container direction="row"
                              justifyContent="flex-start"
                              alignItems={"flex-start"}

                        >
                            <form style={{width: "100%"}} onSubmit={handleSubmit(onSubmitRegistration)}>

                                <Grid item>
                                    <Grid container direction={"column"} justifyContent={"space-between"} marginBottom={1}>
                                        <Typography marginBottom={1} variant={"subtitle2"} component={"p"}>Login</Typography>
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
                                        })} helperText={errors?.login && errors?.login?.message || ' '} error={!!errors?.login} value={login} onChange={handleLoginChange} type={"text"} id="user_login" label="Your login" variant="outlined"/>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                <Grid container direction={"column"} justifyContent={"space-between"} marginBottom={1}>
                                    <Typography marginBottom={1} variant={"subtitle2"} component={"p"}>Email</Typography>
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

                                <Grid container direction={"column"} justifyContent={"space-between"} marginBottom={1}>
                                    <Typography marginBottom={1} variant={"subtitle2"} component={"p"}>New password</Typography>
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
                                    })} helperText={errors?.password && errors?.password?.message || ' '} error={!!errors?.password} value={password} onChange={handlePasswordChange} id="user_password" label="New password" variant="outlined"/>
                                </Grid>

                                <Grid container direction={"column"} justifyContent={"space-between"} marginBottom={1}>
                                    <Typography marginBottom={1} variant={"subtitle2"} component={"p"}>New password confirmation</Typography>
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
                                    })} helperText={errors?.passwordConfirm && errors?.passwordConfirm?.message || ' '} error={!!errors?.passwordConfirm} value={passwordConfirm} onChange={handlePasswordConfirmChange} id="user_confirm_password" label="Confirm the new password" variant="outlined"/>
                                </Grid>

                                <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography variant={"subtitle2"} component={"h6"}>Already have an account?
                                        <Link style={{textDecoration: "none", color: "rgb(55, 125, 255)"}} to="/sign-in"> Login.</Link>
                                    </Typography>
                                    <Button type={"submit"} style={{backgroundColor: "rgb(66, 125, 255)"}} variant="contained">Sign Up</Button>
                                </Grid>
                            </form>
                        </Grid>

                    </Grid>
                    <Grid container item xs={6} style={{padding: 0}} justifyContent={"center"} alignItems={"center"}>
                        <Main/>
                    </Grid>

                </Container>
            </Box>
        </>

    );
}

export default SignUp;
