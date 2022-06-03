import React from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import AuthStatus from "../../AuthConfig/AuthStatus";
import CustomLink from "../../Components/links/CustomLink";
import '../Layout/layout.scss'
import {Headers} from "../../Components/header/Headers";
import Footer from "../../Components/footer/Footer";


function Layout() {
    return (
        <>
            <Headers/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Layout;

