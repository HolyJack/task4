import { createContext, useContext, useState } from "react";

export interface AuthContextValues {
  username?: string;
  status: boolean;
  login: (username: string) => void;
  logout: () => void;
}

function phlogin(username: string) {
  if (username) return;
}
function phlogout() {
  return;
}

const authInit = { status: false, login: phlogin, logout: phlogout };

export const AuthContext = createContext<AuthContextValues>(authInit);

export function AuthContextProvider({ children }: React.PropsWithChildren) {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const status = username ? true : false;
  const contextValue = { username, status, login, logout };
  function login(username: string) {
    setUsername(username);
  }

  function logout() {
    setUsername(undefined);
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
