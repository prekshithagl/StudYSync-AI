import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('studysync_token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('studysync_user');
    return stored ? JSON.parse(stored) : null;
  });

  const persist = (auth) => {
    localStorage.setItem('studysync_token', auth.token);
    localStorage.setItem('studysync_user', JSON.stringify(auth.user));
    setToken(auth.token);
    setUser(auth.user);
  };

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    persist(data);
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    persist(data);
  };

  const updateUser = (nextUser) => {
    localStorage.setItem('studysync_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem('studysync_token');
    localStorage.removeItem('studysync_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, isAuthenticated: Boolean(token), login, register, logout, updateUser }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
