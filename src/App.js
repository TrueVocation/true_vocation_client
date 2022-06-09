import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound404 from "./Pages/NotFound/NotFound404";
import Layout from "./Pages/Layout/Layout";
import AuthProvider from "./AuthConfig/AuthProvider";
import SignIn from "./Pages/Auth/SignIn";
import RequireAuth from "./AuthConfig/RequireAuth";
import SignUp from "./Pages/Auth/SignUp";
import {SnackbarProvider} from "notistack";
import ResetPassword from "./Pages/Auth/ResetPassword";
import ResetPasswordFinish from "./Pages/Auth/ResetPasswordFinish";
import Subjects from "./Pages/Subjects/Subjects";
import Tests from "./Pages/Tests/Tests";
import TestDetails from "./Pages/Tests/TestDetails";
import UniversityDetails from "./Pages/Universities/UniversityDetails";
import Posts from "./Pages/Posts/Posts";
import PostDetails from "./Pages/Posts/PostDetails";
import Profile from "./Pages/User/Profile";
import UniversityFilter from "./Pages/Universities/UniversityFilter";
import Portfolio from "./Pages/Portfolio/Portfolio";
import { useFavicon } from 'react-haiku';
import { useTitle } from 'react-haiku';

function App() {
  const { setFavicon } = useFavicon();
  setFavicon("http://localhost:8080/api/static/logo.png")
  useTitle("True Vocation");
    return (
    <>
    <SnackbarProvider>
      <AuthProvider>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:id" element={<PostDetails />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="account/reset/finish" element={<ResetPasswordFinish />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="universities" element={<UniversityFilter/>}/>
              <Route path="tests" element={<Tests />} />
              <Route path="tests/:id" element={<TestDetails />} />
              <Route path="university/:id" element={<UniversityDetails />} />
              <Route path="profile" element={<Profile />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="*" element={<NotFound404 />} />
          </Route>

        </Routes>

      </AuthProvider>
    </SnackbarProvider>
    </>
  );
}

export default App;
