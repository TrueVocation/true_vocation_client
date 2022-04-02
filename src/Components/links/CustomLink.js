import {Link, useMatch} from "react-router-dom";
import './links.scss'

function CustomLink({children, to, ...props}) {
    const match = useMatch(to);

    return (
        <div className={match ? "custom_active_link" : "custom_link"}>
            <Link to={to} style={{
                textDecoration: "none",
                fontFamily: "Inter",
                color: "rgb(103, 119, 136)",
            }}>
                {children}
            </Link>
        </div>
    );
}

export default CustomLink;
