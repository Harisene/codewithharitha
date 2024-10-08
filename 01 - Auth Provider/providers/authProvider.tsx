import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from "@/firebase";

const initialState = {
  isAuthenticated: undefined,
  login: async () => { },
  register: async () => { },
  logout: async () => { }
}

type AuthContextType = {
  isAuthenticated: boolean | undefined;
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>(initialState);

interface Props extends PropsWithChildren { }

const AuthProvider: React.FC<Props> = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    })
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  const register = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be accessible within the AuthProvider');
  }

  return context;
}