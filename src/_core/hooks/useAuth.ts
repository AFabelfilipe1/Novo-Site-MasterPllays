import React from 'react';


export const useAuth = () => {
// Minimal auth mock
const [user, setUser] = React.useState<{id:string;name:string}|null>(null);
const login = (name = 'Usuário') => setUser({ id: 'u1', name });
const logout = () => setUser(null);
return { user, login, logout };
};


export default useAuth;