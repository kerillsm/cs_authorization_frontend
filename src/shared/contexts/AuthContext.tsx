import { createContext, useState, useLayoutEffect } from "react";

interface State {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<State>({
  login: async () => {},
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

  function login(login: string, password: string) {
    return fetch("endpoint", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    })
      .then((response) => response.json())
      .then((data: { token: string; expiredAt: string }) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("tokenExpiredAt", data.expiredAt);
        setToken(data.token);
      });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiredAt");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
