import {Grid} from "@mui/material";
import {ReactComponent as Error} from '../../images/Error Alien Spaceship.svg'
import {ReactComponent as Main} from '../../images/Astronaut-ai.svg'
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";

function NotFound404() {
    const navigate = useNavigate();

    const back = () =>{
        navigate("/", {replace : true});
    }

  return <>
        <Grid container flexDirection={"row"} justifyContent={"center"} alignItems={"center"} xs={12} style={{minHeight:window.innerHeight*0.8}}>


            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} style={{paddingTop:20, paddingLeft:20,paddingRight:10}}>


                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} display={"flex"} style={{marginBottom:40}}>
                    <Error/>
                </Grid>


                <div>
                    <Typography variant={"h2"} fontFamily={"Inter"} fontWeight={"bold"}
                                style={{color: "#2d3e4a", marginBottom: 0}}>Lost in Space?</Typography>
                    <Typography variant={"h5"} fontFamily={"Inter"}
                                style={{color: "rgb(103, 119, 136)", marginTop: 10, marginBottom:15}}>Oops! Looks like you followed a bad link.
                        If you think this is a problem with us, please tell us</Typography>
                    <Button size={"large"} id={"primary_button"} onClick={back} variant={"contained"} style={{textTransform:"initial"}}>Back home</Button>
                </div>
            </Grid>


            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Main/>
            </Grid>


        </Grid>
    </>

}

export default NotFound404;
