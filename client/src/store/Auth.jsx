import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("server_token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;
  // const API = import.meta.env.VITE_APP_URI_API;
  const API = "https://deva-mern-backend.onrender.com";

  // ?↓↓↓This line means if the token is present the isLoggedIn value will be true else it will be false
  let isLoggedIn = !!token;

  console.log("token:", isLoggedIn);
  // Function for storing token to localStorage
  const storeTokenToLocalStrorage = (server_token) => {
    setToken(server_token);
    return localStorage.setItem("server_token", server_token);
  };

  //   Function for Logout(i.e Removing the token)
  const logOutUser = () => {
    setToken("");
    return localStorage.removeItem("server_token");
  };

  // JWT AUTHENTICATION - to get the currently loggedIn user data

  const userAuthentication = async () => {
    try {
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("user data:", data);
        setUser(data.userData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(`Error while  fetching the user data`);
      setIsLoading(false);
    }
  };

  // function for fetching the data from DB
  const fetchCardData = async () => {
    try {
      const response = await fetch(`${API}/api/data/services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Fetching Services from: ", `${API}/api/auth/user`);

      if (response.ok) {
        const res_data = await response.json();
        setServices(res_data.response);
      }
    } catch (error) {
      console.log("Error fetching card data:", error);
    }
  };

  useEffect(() => {
    fetchCardData();
    if (token) {
      userAuthentication();
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        storeTokenToLocalStrorage,
        logOutUser,
        isLoggedIn,
        user,
        services,
        authorizationToken,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    console.log(`Wrap the Provider Properly`);
  }
  return authContextValue;
};
