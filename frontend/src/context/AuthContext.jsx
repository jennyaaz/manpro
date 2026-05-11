import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const getMe = async () => {

    try {

      const response =
        await api.get("/auth/me");

      setUser(response.data.data);

    } catch (error) {

      setUser(null);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    getMe();
  }, []);

  const login = async (data) => {

    const response =
      await api.post(
        "/auth/login",
        data
      );

    setUser(response.data.data);

    return response.data;

  };

  const logout = async () => {

    await api.post("/auth/logout");

    setUser(null);

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;

};