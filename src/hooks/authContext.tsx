import React, { createContext, useContext, useEffect, useState } from "react";
import { login, register } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthContext {
    token: string;
    email: string;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    isLoading: boolean

}

const AuthContext = createContext<IAuthContext>({
    token: '',
    email: '',
    login: async () => {},
    register: async () => {},
    isLoading: false
})

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        AsyncStorage.getItem('token')
        .then(value => {
            if (value !== null) {
                setToken(value)
            }
        })
        .finally(() => {setIsLoading(false)})
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            const result = await login(email, password);
            await AsyncStorage.setItem('email', email);
            setToken(result);
            setEmail(email);
            await AsyncStorage.setItem('token', result);
        } catch (error) {
            console.log(error)
        }
    };

    //async functions that handle login/register
    const handleRegister = async (email: string, password: string) => {
        try {
            const result = await register(email, password);
            await AsyncStorage.setItem('email', email);
            setEmail(email);
            await AsyncStorage.setItem('token', result);
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <AuthContext.Provider value={{
            token,
            email,
            login: handleLogin,
            register: handleRegister,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
