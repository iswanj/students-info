import { createContext, ReactNode, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { USER } from "../constants";

type User = {
  // Define the type for your user data here
  // Example: id: number;
  error: boolean;
  name: string;
  token: string;
};

type Props = {
  children: ReactNode;
};

type IAuthContext = {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
};

const initialValue: IAuthContext = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage<User | null>(USER, null);

  const navigate = useNavigate();

  const login = async (data: User) => {
    console.log("called login function");
    setUser(data);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
