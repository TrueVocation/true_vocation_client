import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AuthStatus from "../../AuthConfig/AuthStatus";
import CustomLink from "../../Components/links/CustomLink";
import '../Layout/layout.scss'


function Layout() {


  return (
    <>
      <header>
        <CustomLink to={"/"}>Home</CustomLink>
        <CustomLink to={"/sign-in"}>Sign In</CustomLink>
        <CustomLink to={"/sign-up"}>Sign Up</CustomLink>
        <CustomLink to={"/something"}>Sign Up</CustomLink>
        <CustomLink to={"/reset-password"}>Reset Password</CustomLink>
      </header>
      <AuthStatus />
      <Outlet />

      <footer>footer</footer>
    </>
  );
}

export default Layout;

