import React from 'react';
import Layout from '../components/Layout';


export const Profile: React.FC = () => {
return (
<Layout>
<div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
<h2 className="text-xl font-semibold">Meu perfil</h2>
<p className="text-sm text-gray-600 mt-2">Página de exemplo com informações do usuário.</p>
</div>
</Layout>
);
};


export default Profile;