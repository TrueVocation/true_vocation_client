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

function App() {
    return (
    <>
      <AuthProvider>
          <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="something"
              element={
                <RequireAuth>
                  <div>something</div>
                </RequireAuth>
              }
            />

          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
          </SnackbarProvider>
      </AuthProvider>
    </>
  );
}

export default App;
