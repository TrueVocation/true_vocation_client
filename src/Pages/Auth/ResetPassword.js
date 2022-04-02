import {useLocation, useNavigate} from "react-router-dom";
import {Headers} from "../../Components/header/Headers";
import {Alert, AlertTitle, Container, Grid, TextField,} from "@mui/material";
import {ReactComponent as Main} from "../../images/undraw_forgot_password_re_hxwm.svg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {default as axios} from "axios";
import {API_BASE} from "../../Constants/Constants";

function ResetPassword() {
  const {register, handleSubmit, watch, formState: { errors }} = useForm({ mode: "onBlur" });

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  async function resetPassword(data) {
     const response = await axios.post(`${API_BASE}/account/reset-password/init`,data.email,{
       headers:{
        "Content-Type": "application/text"
       }
     });
     if(response.status === 200){
      setSent(true);
     }
  }

  function back() {
    navigate(-1);
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
                style={{ fontWeight: "bold" ,color:"rgb(45, 55, 72)"}}
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
                      <AlertTitle>Check your email</AlertTitle>
                      To your email <strong>{email}</strong> an email was sent with a link to reset your password
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
                    <Grid
                        container
                        direction={"column"}
                        justifyContent={"space-between"}
                        marginBottom={1}
                    >
                      <Typography
                          marginBottom={1}
                          variant={"subtitle2"}
                          component={"p"}
                          fontFamily={"Inter"}
                      >
                        Enter your email
                      </Typography>
                      <TextField
                          {...register("email", {
                            required: "Email field is required",
                            minLength: {
                              value: 2,
                              message: "length must be greater than 1 character",
                            },
                            maxLength: {
                              value: 50,
                              message: "length must be less than 50 character",
                            },
                          })}
                          helperText={
                              (errors?.email && errors?.email?.message) || " "
                          }
                          error={!!errors?.email}
                          id={"user_email"}
                          value={email}
                          onChange={handleEmailChange}
                          type={"email"}
                          label="Email"
                          variant="outlined"
                      />
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
                  id={"primary_button_outlined"}
                  >
                  Back to login
                  </Button>
                  <Button
                  size={"large"}
                  type={"submit"}
                  id={"primary_button"}
                  variant="contained"
                  fontFamily={"Inter"}
                  >
                  Send reset link
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

export default ResetPassword;
