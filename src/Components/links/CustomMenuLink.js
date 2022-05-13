import {Link, useMatch} from "react-router-dom";
import './links.scss'
import {ChevronRightTwoTone} from "@mui/icons-material";

function CustomMenuLink({children, to, ...props}) {
    const match = useMatch(to);

    return (
        <div className={match ? "custom_menu_active_link" : "custom_menu_link"}
             style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Link  to={to} style={{
                textDecoration: "none",
                fontFamily: "Inter",
                fontSize: 15,
                alignSelf:"center",
                color: "rgb(45, 62, 74)",
            }}>
                {children}
            </Link>

            <ChevronRightTwoTone/>
        </div>
    );
}

export default CustomMenuLink;
