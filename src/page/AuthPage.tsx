import React from 'react';
import Layout from '../components/Layout';
import { Input } from '../components/ui/input';
import Button from '../components/ui/button';


export const AuthPage: React.FC = () => {
return (
<Layout>
<div className="max-w-md mx-auto bg-white p-6 rounded shadow">
<h2 className="text-xl font-semibold mb-4">Entrar</h2>
<form className="flex flex-col gap-3">
<Input label="E-mail" type="email" name="email" />
<Input label="Senha" type="password" name="password" />
<Button type="submit">Entrar</Button>
</form>
</div>
</Layout>
);
};


export default AuthPage;