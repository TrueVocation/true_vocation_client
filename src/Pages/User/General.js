import React, {useEffect, useState} from 'react';
import {Divider, Grid, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import useAuth from "../../AuthConfig/useAuth";
import IconButton from "@mui/material/IconButton";
import {PhotoCamera} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import {styled} from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const Input = styled('input')({
    display: 'none',
});

function General(props) {
    const auth = useAuth();
    const {register, handleSubmit, watch, formState: {errors, isSubmitSuccessful}, reset,} = useForm({mode: "onBlur"});
    const [login, setLogin] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdate, setBirthdate] = useState(null);

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


    const onSubmit = data => {

    }

    useEffect(()=>{
        if(auth.user != null){
            setLogin(auth.user.login)
            setFirstName(auth.user.firstName)
            setLastName(auth.user.lastName)
            setEmail(auth.user.email)
        }
    })

    return (
        <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <Grid item xs={12} sm={12} md={4} marginBottom={3}>
                <Paper variant={"elevation"} elevation={0} style={{
                    borderRadius: 8,
                    boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                }}
                       square={true}>
                    <Grid container display={"flex"} flexDirection={"row"} justifyContent={"center"}
                          alignItems={"center"}>
                        <Grid item container xs={12} style={{padding: "25px 25px"}}>
                            <Typography variant={"h3"} style={{
                                fontSize: 20,
                                fontWeight:"600",
                                fontFamily: "Inter",
                                color: "rgb(45, 62, 74)",
                                textAlign:"center"
                            }}>
                                Profile Picture
                            </Typography>

                        </Grid>
                        <Grid item xs={12} marginBottom={3}>
                            <Divider/>
                        </Grid>
                        <Grid item xs={6} marginBottom={1}>
                            <Box>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    style={{width:"100%"}}
                                    badgeContent={
                                        <label htmlFor="icon-button-file">
                                            <Input accept="image/*" id="icon-button-file" type="file" />
                                            <IconButton style={{backgroundColor:"rgb(55, 125, 255)",color:"white"}} size={"large"}  aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    }
                                >
                                    <Avatar style={{width:"100%",height:"100%"}} alt="Travis Howard" src={auth.avatar !== null ? auth.avatar : null} />
                                </Badge>
                            </Box>

                        </Grid>
                        <Grid item xs={10} marginBottom={1} >
                            <Typography variant={"h3"} style={{
                                fontSize: 20,
                                fontWeight:"600",
                                fontFamily: "Inter",
                                color: "rgb(45, 62, 74)",
                                textAlign:"center"
                            }}>
                                {auth.avatar !== null ? auth.user.firstName+" "+auth.user.lastName : ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={10} style={{paddingBottom:20}}>
                            <Typography variant={"h3"} style={{
                                fontSize: 15,
                                fontFamily: "Inter",
                                color: "rgb(99, 115, 129)",
                                marginTop: 10,
                                textAlign:"center"
                            }}>
                                Allowed *.jpeg, *.jpg, *.png,
                                Recommended dimensions: 200x200, maximum file size: 5MB
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={7.7}>
                <Paper variant={"elevation"} elevation={0} style={{
                    borderRadius: 8,
                    boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                }}
                       square={true}>
                    <Grid container display={"flex"} flexDirection={"row"}>
                        <Grid item container xs={12} style={{padding: "25px 25px"}}>
                            <Typography variant={"h3"} style={{
                                fontSize: 20,
                                fontWeight:"600",
                                fontFamily: "Inter",
                                color: "rgb(45, 62, 74)",
                                textAlign:"center"
                            }}>
                                Edit Account Details
                            </Typography>

                        </Grid>
                        <Grid item xs={12} marginBottom={3}>
                            <Divider/>
                        </Grid>


                        <Grid item container xs={12} style={{padding: "0 25px 0 25px"}}>
                            <form style={{width: "100%"}} onSubmit={handleSubmit(onSubmit)}>
                                <Grid item container xs={12} display={"flex"} flexDirection={"row"}
                                      justifyContent={"space-between"}>

                                    <Grid item xs={12} sm={5.8} marginBottom={1}>
                                        <TextField size={"medium"}  InputProps={{style:{borderRadius:8,padding:"5px 5px",fontSize:18}}}  {...register("login", {
                                            minLength: {
                                                value: 1,
                                                message: "length must be greater than 0 character"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "length must be less than 50 character"
                                            }
                                        })} name={'login'} helperText={errors?.login && errors?.login?.message || ' '}
                                                   error={!!errors?.login}
                                                   value={login} onChange={handleChange} fontFamily={"Inter"} type={"text"}
                                                   fullWidth
                                                   label="Login" variant="outlined"/>
                                    </Grid>

                                    <Grid item xs={12} sm={5.8} marginBottom={1}>
                                        <TextField size={"medium"} InputProps={{style:{borderRadius:8,padding:"5px 5px",fontSize:18}}}  {...register("email", {
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
                                                   value={email} onChange={handleChange} fontFamily={"Inter"} type={"email"}
                                                   fullWidth
                                                   id="user_login" label="Email" variant="outlined"/>
                                    </Grid>

                                    <Grid item xs={12} sm={5.8} marginBottom={1}>
                                        <TextField size={"medium"} InputProps={{style:{borderRadius:8,padding:"5px 5px",fontSize:18}}}  {...register("firstName", {
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
                                                   value={firstName} onChange={handleChange} fontFamily={"Inter"} type={"text"}
                                                   fullWidth
                                                   label="Firstname" variant="outlined"/>
                                    </Grid>

                                    <Grid item xs={12} sm={5.8} marginBottom={1}>
                                        <TextField size={"medium"} InputProps={{style:{borderRadius:8,padding:"5px 5px",fontSize:18}}}  {...register("lastName", {
                                            minLength: {
                                                value: 1,
                                                message: "length must be greater than 0 character"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "length must be less than 50 character"
                                            }
                                        })} name={'lastName'} helperText={errors?.lastName && errors?.lastName?.message || ' '}
                                                   error={!!errors?.lastName}
                                                   value={lastName} onChange={handleChange} fontFamily={"Inter"} type={"text"}
                                                   fullWidth
                                                   label="Lastname" variant="outlined"/>
                                    </Grid>

                                    <Grid item xs={12} sm={5.8} marginBottom={1}>
                                        <TextField size={"medium"} InputLabelProps={{style:{padding:"5px"}}} InputProps={{style:{borderRadius:8,padding:"5px 5px",fontSize:18}}}  {...register("phoneNumber", {
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
                                                   label="Phone number" variant="outlined"/>
                                    </Grid>

                                    <Grid item xs={12} sm={5.8} marginBottom={1}>
                                        <TextField size={"medium"} InputProps={{style:{borderRadius:8,padding:"5px 5px",fontSize:18}}}  {...register("birthdate", {

                                        })}
                                                   name={'birthdate'}
                                                   helperText={errors?.birthdate && errors?.birthdate?.message || ' '}
                                                   error={!!errors?.birthdate}
                                                   value={birthdate} onChange={handleChange} fontFamily={"Inter"}
                                                   type={"date"} fullWidth
                                                   variant="outlined"/>
                                    </Grid>

                                    <Grid item xs={12} display={"flex"} marginBottom={3} justifyContent={"flex-start"}>
                                        <Button id={"primary_button"} size={"large"} type={"submit"} variant="contained"
                                                fontFamily={"Inter"}>Save changes</Button>
                                    </Grid>

                                </Grid>
                            </form>
                        </Grid>
                    </Grid>


                </Paper>
            </Grid>
        </Grid>
    );
}

export default General;