import { Link, NavLink, Outlet } from "react-router-dom";
import AuthStatus from "../../AuthConfig/AuthStatus";
import CustomLink from "../Links/CustomLink";

function Layout() {
  return (
    <>
      <header>
        <CustomLink to={"/"}>Home</CustomLink>
        <CustomLink to={"/about"}>About</CustomLink>
        <CustomLink to={"/posts"}>Posts</CustomLink>
      </header>
      <AuthStatus />
      <Outlet />

      <footer>footer</footer>
    </>
  );
}

export default Layout;
