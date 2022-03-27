import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import { Headers } from "../../Components/header/Headers";
import {Alert, AlertTitle, Checkbox, Container, createTheme, Grid, TextField,} from "@mui/material";
import { ReactComponent as Main } from "../../images/undraw_forgot_password_re_hxwm.svg";
import Typography from "@mui/material/Typography";
import { ReactComponent as Logo } from "../../logo.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {default as axios} from "axios";
import {API_BASE} from "../../Constants/Constants";
import {useSnackbar} from "notistack";

function ResetPasswordFinish() {
  const {register, handleSubmit, watch, formState: { errors }} = useForm({ mode: "onBlur" });
  const { enqueueSnackbar } = useSnackbar();

  let [searchParams, setSearchParams] = useSearchParams();

  const [sent, setSent] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  const handlePasswordConfirmChange = event => {
    setPasswordConfirm(event.target.value);
  }


  async function resetPassword(data) {
     if(data.password === data.passwordConfirm){
       const userData = {
         key : searchParams.get("key"),
         newPassword: data.password
       }
       const response = await axios.post(`${API_BASE}/account/reset-password/finish`,userData,{
         headers:{
           "Content-Type": "application/json"
         }
       });
       if(response.status === 200){
         setSent(true);
       }
     }else{
       enqueueSnackbar("The password are not the same!", {variant:"error"});
     }

  }

  function back() {
    navigate("/sign-in", {replace:true});
  }

  return (
    <>
      <Box style={{ height: "650px" }}>
        <Headers />
        <Container maxWidth="xl" style={{
            display: "flex",
            paddingLeft: 0,
            paddingRight: 0,
            height: "100%",
          }}
        >
          <Grid item xs={1} />
          <Grid
            container
            item
            xs={5}
            style={{ padding: 0, paddingLeft: 25, paddingRight: 25 }}
            flexDirection={"column"}
            justifyContent={"space-evenly"}
            spacing={0}
            alignItems={"center"}
          >
            <Grid />
            <Grid />
            <Grid />
            <Grid
              container
              item
              direction="column"
              alignItems="flex-start"
              style={{ margin: 0 }}
            >
              <Typography
                variant={"body1"}
                component={"p"}
                fontFamily={"Inter"}
                style={{ color: " rgb(103, 119, 136)" }}
              >
                RECOVER ACCOUNT
              </Typography>
              <Typography
                variant={"h4"}
                fontFamily={"Inter"}
                component={"h4"}
                style={{ fontWeight: "bold",color:"rgb(45, 55, 72)" }}
              >
                Forgot your password?
              </Typography>
              <Typography
                variant={"body1"}
                component={"p"}
                style={{ color: " rgb(103, 119, 136)" }}
                fontFamily={"Inter"}
              >
                Enter your email address below and we'll get you back on track.
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems={"flex-start"}
            >

              <form
                style={{ width: "100%" }}
                onSubmit={handleSubmit(resetPassword)}
              >
                {sent ?
                    <>
                    <Alert severity="success" style={{marginBottom:20}}>
                      <AlertTitle>Success</AlertTitle>
                      The password was successfully reset!!!
                    </Alert>
                    <Button
                        size={"large"}
                        type={"button"}
                        onClick={back}
                        variant="outlined"
                        fontFamily={"Inter"}
                        style={{textTransform:"initial"}}
                    >
                      Back to login
                    </Button>
                    </>
                    :
                    <>
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

                      <Grid container direction={"column"} justifyContent={"space-between"} marginBottom={2}>
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

                  <Grid
                  container
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  >
                  <Button
                  size={"large"}
                  type={"button"}
                  onClick={back}
                  variant="outlined"
                  fontFamily={"Inter"}
                  style={{textTransform:"initial"}}
                  >
                  Back to login
                  </Button>
                  <Button
                  size={"large"}
                  type={"submit"}
                  style={{backgroundColor: "rgb(66, 125, 255)",textTransform:"initial"}}
                  variant="contained"
                  fontFamily={"Inter"}
                  >
                  Reset password
                  </Button>
                  </Grid>
                    </>
                }
              </form>

            </Grid>
            <Grid />
            <Grid />
            <Grid />
          </Grid>
          <Grid
            container
            item
            xs={6}
            style={{ padding: 20 }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Main />
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default ResetPasswordFinish;
