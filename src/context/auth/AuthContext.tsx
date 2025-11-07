import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FC,
  useContext,
} from "react";

import { ITokenPayloadObject } from "@/app/auth/login/types/loginResponse";

export type supportedLangs = "en" | "np";

type AuthContext = {
  userDetails: ITokenPayloadObject | null;
  updateUserDetails: (details: ITokenPayloadObject | null) => void;
};

const defaultAuthContext: AuthContext = {
  userDetails: null,
  updateUserDetails: () => {},
};

export const AuthContext = createContext<AuthContext>(defaultAuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<ITokenPayloadObject | null>(
    null
  );

  const updateUserDetails = (details: ITokenPayloadObject | null) => {
    if (details) {
      localStorage.setItem("userDetails", JSON.stringify(details));
    } else {
      localStorage.removeItem("userDetails");
    }

    setUserDetails(details);
  };

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      try {
        setUserDetails(JSON.parse(storedUserDetails));
      } catch (error) {
        console.error("Failed to parse user details:", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userDetails, updateUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
