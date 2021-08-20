import React, { createContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Client {
  id: number,
  numberAccount: string,
  name: string,
  age: number,
  email: string,
  password: string,
  balance: number,
}

interface Auth {
  client: Client,
  loading: boolean,
  authenticated: boolean,
  handleLogin: Function,
  handleLogout: Function,
}

const initialClient = {
  id: 0,
  numberAccount: "",
  name: "",
  age: 18,
  email: "",
  password: "",
  balance: 0
}

const initialContext = {
  client: initialClient,
  loading: false,
  authenticated: false,
  handleLogin: (): void => {},
  handleLogout: (): void => {},
}

export const AuthContext = createContext<Auth>(initialContext)

export function AuthProvider(children: any) {
  const { client, authenticated, loading, handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider value={{ client, loading, authenticated, handleLogin, handleLogout}}>
      {children.children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<Client>(initialClient);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function handleLogin(user: Client) {
    await api.post('/Logins', user).then(response => {
      const {clientFind, token} = response.data
    
      setClient(clientFind)
      setAuthenticated(true);
      localStorage.setItem('client', JSON.stringify(clientFind));
      localStorage.setItem('token', JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;

    });
  }

  function handleLogout() {
    setAuthenticated(false);
    setClient(initialClient);
    localStorage.removeItem('client');
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
  }
  
  return { client, authenticated, loading, handleLogin, handleLogout };
}