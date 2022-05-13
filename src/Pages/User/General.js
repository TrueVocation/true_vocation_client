import React, {useState} from 'react';
import {Grid, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";

function General(props) {
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

    return (
        <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <Grid item xs={4}>
                <Paper variant={"elevation"} elevation={0} style={{
                    borderRadius: 8,
                    boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                    padding: "20px 15px 20px 15px"
                }}
                       square={true}>
                    <Grid container display={"flex"} flexDirection={"column"} justifyContent={"center"}
                          alignItems={"center"}>
                        <Grid item xs={6} marginBottom={2}>
                            <img style={{width: "100%", borderRadius: "50%"}}
                                 src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant={"h3"} style={{
                                fontSize: 15,
                                fontFamily: "Inter",
                                color: "rgb(99, 115, 129)",
                                marginTop: 10
                            }}>
                                Allowed *.jpeg, *.jpg, *.png, *.gif
                                max size of 3.1 MB
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={7.8}>
                <Paper variant={"elevation"} elevation={0} style={{
                    borderRadius: 8,
                    boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
                    padding: "25px 25px 25px 25px"
                }}
                       square={true}>
                    <form style={{width: "100%"}} onSubmit={handleSubmit(onSubmit)}>
                        <Grid item container xs={12} display={"flex"} flexDirection={"row"}
                              justifyContent={"space-between"}>

                            <Grid item xs={5.8} marginBottom={1}>
                                <TextField size={"medium"}  InputProps={{style:{borderRadius:8}}}  {...register("login", {
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

                            <Grid item xs={5.8} marginBottom={1}>
                                <TextField size={"medium"} InputProps={{style:{borderRadius:8}}}  {...register("email", {
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

                            <Grid item xs={5.8} marginBottom={1}>
                                <TextField size={"medium"} InputProps={{style:{borderRadius:8}}}  {...register("firstName", {
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

                            <Grid item xs={5.8} marginBottom={1}>
                                <TextField size={"medium"} InputProps={{style:{borderRadius:8}}}  {...register("lastName", {
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

                            <Grid item xs={5.8} marginBottom={1}>
                                <TextField size={"medium"} InputProps={{style:{borderRadius:8}}}  {...register("phoneNumber", {
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

                            <Grid item xs={5.8} marginBottom={1}>
                                <TextField size={"medium"} InputProps={{style:{borderRadius:8}}}  {...register("birthdate", {

                                })}
                                           name={'birthdate'}
                                           helperText={errors?.birthdate && errors?.birthdate?.message || ' '}
                                           error={!!errors?.birthdate}
                                           value={birthdate} onChange={handleChange} fontFamily={"Inter"}
                                           type={"date"} fullWidth
                                            variant="outlined"/>
                            </Grid>

                            <Grid item xs={12} display={"flex"} marginBottom={3} justifyContent={"flex-end"}>
                                <Button id={"primary_button"} size={"large"} type={"submit"} variant="contained"
                                        fontFamily={"Inter"}>Save changes</Button>
                            </Grid>

                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default General;