import {Grid} from "@mui/material";
import {ReactComponent as Main} from '../../images/Error 404.svg'
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Headers} from "../../Components/header/Headers";
import Typography from "@mui/material/Typography";

function NotFound404() {
    const navigate = useNavigate();

    const back = () =>{
        navigate("/", {replace : true});
    }

  return <>
        <Headers/>
        <Grid container flexDirection={"row"} justifyContent={"center"} alignItems={"center"} xs={12}>
            <Grid item xs={1}/>
            <Grid item xs={5}>
                <Typography variant={"h1"} fontFamily={"Inter"} fontWeight={"bold"}
                            style={{color: "#2d3e4a", marginTop: 140, marginBottom: 0}}>404</Typography>
                <Typography variant={"h5"} fontFamily={"Inter"}
                            style={{color: "rgb(103, 119, 136)", marginTop: 10, marginBottom:15}}>Oops! Looks like you followed a bad link.
                    If you think this is a problem with us, please tell us</Typography>
                <Button size={"large"} id={"primary_button"} onClick={back} variant={"contained"} style={{textTransform:"initial"}}>Back home</Button>
            </Grid>
            <Grid item xs={6} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Main/>
            </Grid>
        </Grid>
    </>

}

export default NotFound404;
