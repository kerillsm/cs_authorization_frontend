import { createContext, useState, useEffect } from "react";
import { axiosInstance } from "shared/axios/axios";

interface State {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    name: string,
    password: string,
    repeatPassword: string
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<State>({
  login: () => Promise.reject("Application is not initialized"),
  register: () => Promise.reject("Application is not initialized"),
  logout: () => {},
  token: null,
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    if (!tokenFromLS) return;
    const expiredAtTokenFromLS = Number(localStorage.getItem("tokenExpiredAt"));
    if (expiredAtTokenFromLS < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiredAt");
      return;
    }
    setToken(token);
  }, []);

  function login(email: string, password: string) {
    return axiosInstance
      .post("/auth/login", { email, password })
      .then((d) => d.data)
      .then((data: { access_token: string; expiredAt: string }) => {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem(
          "tokenExpiredAt",
          String(Date.now() + 60 * 60 * 1000)
        );
        setToken(data.access_token);
      })
      .catch((error) => {
        if (error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error(error.message);
        }
      });
  }

  function register(
    email: string,
    name: string,
    password: string,
    repeatPassword: string
  ): Promise<void> {
    if (password !== repeatPassword) {
      alert("Password does not match");
      return Promise.reject();
    }
    return axiosInstance
      .post("/auth/register", { email, name, password })
      .then((d) => d.data)
      .then(({ name, email }) => {
        alert(`User with name: ${name} and email ${email} created!`);
        return;
      })
      .catch((error) => {
        if (error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error(error.message);
        }
      });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiredAt");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ login, register, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
