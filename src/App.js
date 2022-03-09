import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Posts from "./Pages/Posts/Posts";
import NotFound404 from "./Pages/NotFound/NotFound404";
import Layout from "./Components/Layout/Layout";
import Post from "./Pages/Posts/Post";
import CreatePost from "./Pages/Posts/CreatePost";
import AuthProvider from "./AuthConfig/AuthProvider";
import Login from "./Pages/Login/Login";
import RequireAuth from "./AuthConfig/RequireAuth";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route
              path="posts"
              element={
                <RequireAuth>
                  <Posts />
                </RequireAuth>
              }
            />
            <Route path="posts/:id" element={<Post />} />
            <Route path="posts/new" element={<CreatePost />} />
            <Route path="*" element={<NotFound404 />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
