import { createContext } from 'react';
import type { UserTypes } from '../types/User.types';

type AuthContextType = {
    user: UserTypes | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    token: string | null
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);