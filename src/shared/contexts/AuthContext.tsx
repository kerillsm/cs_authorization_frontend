import { createContext, useState, useLayoutEffect } from "react";

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
  const [token, setToken] = useState<string | null>(null);

  useLayoutEffect(() => {
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
    return fetch("endpoint", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Error while login");
        }
        return response.json();
      })
      .then((data: { token: string; expiredAt: string }) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("tokenExpiredAt", data.expiredAt);
        setToken(data.token);
      });
  }

  function register(
    email: string,
    name: string,
    password: string,
    repeatPassword: string
  ) {
    if (password !== repeatPassword) {
      console.log(password, repeatPassword);
      return Promise.reject(new Error("Password does not match"));
    }
    return fetch("endpoint", {
      method: "POST",
      body: JSON.stringify({ email, name, password }),
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Error while register");
        }
        return;
      })
      .catch((e) => {
        console.log("e", e);
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
