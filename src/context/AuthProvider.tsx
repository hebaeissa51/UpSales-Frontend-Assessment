import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';
import { generateToken } from '../utils/helpers';
import type { UserTypes } from '../types/User.types';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserTypes | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = Cookies.get('token');
        const savedUser = Cookies.get('user');

        if (savedToken && savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setToken(savedToken);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing permissions:', error);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('http://localhost:3001/users');
            const users: UserTypes[] = await response.json();

            const foundUser = users.find(user => user.email === email && user.password === password);

            if (!foundUser) {
                throw new Error('Invalid credentials');
            }

            const token = generateToken();

            Cookies.set('token', token, {
                expires: 1,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            const userData: UserTypes = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email
            };

            Cookies.set('user', JSON.stringify(userData), {
                expires: 1,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });


            setToken(token);
            setUser(userData);
            return true;

        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            user,
            loading,
            token
        }}>
            {children}
        </AuthContext.Provider>
    );
};