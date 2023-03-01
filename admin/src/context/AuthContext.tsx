import React, { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import { getMeApi } from '../services/AuthService';

export const AuthContext = createContext<AuthContextType | null>(null);

interface IAuthProvider {
    children: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
    const [auth, setAuth] = useState<AuthType | null>(null);
    const { isLoading: authLoading, refetch } = useQuery(
        ['GET_ME_API'],
        getMeApi,
        {
            retry: 1,
            onSuccess: ({ data}) => {
                setAuth(data);
            },
        }
    );

    const removeAuth = () => {
        setAuth(null);
    };

    const getMeForce = async () => {
        await refetch();
    };

    return (
        <AuthContext.Provider value={{ auth, authLoading, removeAuth, getMeForce }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;