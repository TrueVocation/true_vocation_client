import React, {useState} from 'react';
import {Alert, AlertTitle, Divider, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {default as axios} from "axios";
import {API_BASE} from "../../Constants/Constants";
import Button from "@mui/material/Button";

function ChangePassword(props) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm({mode: "onBlur"});
    const {enqueueSnackbar} = useSnackbar();

    let [searchParams, setSearchParams] = useSearchParams();

    const [sent, setSent] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleOldPasswordChange = event => {
        setOldPassword(event.target.value);
    }

    const handleNewPasswordChange = event => {
        setNewPassword(event.target.value);
    }


    const handlePasswordConfirmChange = event => {
        setPasswordConfirm(event.target.value);
    }


    async function changePassword(data) {
        if(data.newPassword === data.passwordConfirm){
            const passData = {
                currentPassword : data.oldPassword,
                newPassword : data.newPassword
            }
            let jwtToken = localStorage.getItem("token");
            try {
                const response = await axios.post(`${API_BASE}/account/change-password`, passData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                if (response.status === 200) {
                    setNewPassword('')
                    setPasswordConfirm('')
                    setOldPassword('')
                    enqueueSnackbar(`Password successfully updated!`, {
                        variant: "success",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    });
                }
            }
            catch (error) {
                enqueueSnackbar("Wrong current password", {variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },});
            }
        }else{
            enqueueSnackbar(`Wrong password confirmation.`, {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        }


    }

    return (
        <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <Grid item xs={12} sm={12} md={12} marginBottom={3}>
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
                                fontWeight: "600",
                                fontFamily: "Inter",
                                color: "rgb(45, 62, 74)",
                                textAlign: "center"
                            }}>
                                Change Password
                            </Typography>

                        </Grid>
                        <Grid item xs={12} marginBottom={3}>
                            <Divider/>
                        </Grid>
                        <Grid item xs={11.5} marginBottom={3}>
                            <form
                                style={{width: "100%", display:"flex", flexDirection:"column"}}
                                onSubmit={handleSubmit(changePassword)}
                            >


                                        <Grid xs={11} sm={12} container marginBottom={1} direction={"column"} justifyContent={"space-between"} alignSelf={"center"}>

                                            <TextField size={"medium"} InputLabelProps={{style:{padding:"5px"}}} InputProps={{style:{borderRadius:8,padding:"5px 5px",fontSize:18}}}  {...register("oldPassword", {
                                                required: 'Current password field is required',
                                                minLength: {
                                                    value: 4,
                                                    message: "length must be greater than 3 character"
                                                },
                                                maxLength: {
                                                    value: 99,
                                                    message: "length must be less than 100 character"
                                                }
                                            })} name={'oldPassword'} helperText={errors?.oldPassword && errors?.oldPassword?.message || ' '}
                                                       error={!!errors?.oldPassword}
                                                       value={oldPassword} onChange={handleOldPasswordChange} fontFamily={"Inter"} type={"text"}
                                                       fullWidth
                                                       label="Current password" variant="outlined"/>
                                        </Grid>

                                        <Grid xs={11} sm={12} container marginBottom={1} direction={"column"} justifyContent={"space-between"} alignSelf={"center"}>

                                            <TextField size={"medium"} InputLabelProps={{style:{padding:"5px"}}} InputProps={{style:{borderRadius:8,padding:"5px 5px",fontSize:18}}}  {...register("newPassword", {
                                                required: 'New password field is required',
                                                minLength: {
                                                    value: 4,
                                                    message: "length must be greater than 3 character"
                                                },
                                                maxLength: {
                                                    value: 99,
                                                    message: "length must be less than 100 character"
                                                }
                                            })} name={'newPassword'} helperText={errors?.newPassword && errors?.newPassword?.message || ' '}
                                                       error={!!errors?.newPassword}
                                                       value={newPassword} onChange={handleNewPasswordChange} fontFamily={"Inter"} type={"text"}
                                                       fullWidth
                                                       label="New password" variant="outlined"/>
                                        </Grid>


                                        <Grid xs={11} sm={12} container marginBottom={1} direction={"column"} justifyContent={"space-between"} alignSelf={"center"}>

                                            <TextField size={"medium"} InputLabelProps={{style:{padding:"5px"}}} InputProps={{style:{borderRadius:8,padding:"5px 5px",fontSize:18}}}  {...register("passwordConfirm", {
                                                required: 'Password confirm field is required',
                                                minLength: {
                                                    value: 4,
                                                    message: "length must be greater than 3 character"
                                                },
                                                maxLength: {
                                                    value: 99,
                                                    message: "length must be less than 100 character"
                                                }
                                            })} name={'passwordConfirm'} helperText={errors?.passwordConfirm && errors?.passwordConfirm?.message || ' '}
                                                       error={!!errors?.passwordConfirm}
                                                       value={passwordConfirm} onChange={handlePasswordConfirmChange} fontFamily={"Inter"} type={"text"}
                                                       fullWidth
                                                       label="Password confirm" variant="outlined"/>
                                        </Grid>



                                        <Grid xs={11} sm={12}
                                            container
                                            direction={"row"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                              alignSelf={"center"}
                                        >
                                            <Button
                                                size={"large"}
                                                type={"submit"}
                                                id={"primary_button"}
                                                variant="contained"
                                                fontFamily={"Inter"}
                                            >
                                                Change password
                                            </Button>
                                        </Grid>
                            </form>
                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

        </Grid>
    );
}

export default ChangePassword;