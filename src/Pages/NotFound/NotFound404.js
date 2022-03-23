import {Grid} from "@mui/material";
import {ReactComponent as Main} from '../../images/Error 404.svg'
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Headers} from "../../Components/header/Headers";

function NotFound404() {
    const navigate = useNavigate();

    const back = () =>{
        navigate("/", {replace : true});
    }

  return <>
        <Headers/>
        <Grid container flexDirection={"column"} justifyContent={"center"} alignItems={"center"} xs={12}>
            <Grid item>
                <Main />
            </Grid>
            <Grid item>
                <Button size={"large"} onClick={back} variant={"contained"} style={{textTransform:"initial"}}>Back to home</Button>
            </Grid>
        </Grid>
    </>

}

export default NotFound404;
