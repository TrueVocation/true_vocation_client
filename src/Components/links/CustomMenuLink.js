import {Link, useMatch, useNavigate} from "react-router-dom";
import './links.scss'
import {ChevronRightTwoTone} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import {Grid} from "@mui/material";
import {RenderIf} from "../RenderIf";

function CustomMenuLink({children, to, ...props}) {
    const match = useMatch(to);
    const navigate = useNavigate();

    return (
        // <div onClick={()=>navigate(to)} className={match ? "custom_menu_active_link" : "custom_menu_link"}
        <div onClick={()=>navigate(to)} className={"custom_menu_link"}
             style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            {children}
            <Grid item display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                <RenderIf isTrue={match}>
                    <Badge variant="dot" color={"success"}
                           style={{alignSelf: "center", marginRight: 10, border: "3px solid white", fontSize: 50}}/>
                </RenderIf>

                <ChevronRightTwoTone style={{color: "rgba(34, 51, 84, 0.3)", fontSize: 25}}/>
            </Grid>

        </div>
    );
}

export default CustomMenuLink;
