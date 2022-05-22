import {createContext, useEffect, useState} from "react";
import {API_BASE} from "../Constants/Constants";
import {useSnackbar} from "notistack";

export const AuthContext = createContext(null);
const axios = require("axios").default;

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const signin = (userData, callback) => {
    authenticate(userData, callback);
  };

  const signout = (callback) => {
    setUser(null);
    setAvatar(null);
    localStorage.removeItem("token")
    callback();
  };

  useEffect(() => {
    isAuthenticated();
  }, [updateData]);

  async function authenticate(userData, callback) {
    try {
      const response = await axios.post(`${API_BASE}/authenticate`, userData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.id_token);
        profile();
        callback();
      }
    } catch (error) {
      enqueueSnackbar(`Login or password wrong! Please try again!`, {
        variant: "error",
      });
    }
  }

  async function isAuthenticated() {
    try {
      let jwtToken = localStorage.getItem("token");
      console.log(jwtToken);
      if (jwtToken != null && !(jwtToken === "")) {
        const response = await axios.get(`${API_BASE}/account/authenticate`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (response.status === 200) {
          profile();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function profile() {
    try {
      let jwtToken = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE}/account/user`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.status === 200) {
        setUser(response.data);
        fetchUserImage(response.data);

      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchUserImage(user) {
    try {
      let jwtToken = localStorage.getItem("token");
      const url = new URL(`${API_BASE}/account/viewAvatar/${user.id}`);
      url.searchParams.set("url", user.imageUrl)
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.status === 200) {
        const contentType = response.headers['content-type']
        console.log(response.headers)
        setAvatar(`data:${contentType};base64,` + response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const value = { user,avatar, signin, signout, setUpdateData };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
