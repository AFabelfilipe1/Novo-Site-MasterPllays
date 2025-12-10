import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';


export const AdminDashboard: React.FC = () => {
return (
<Layout>
<h1 className="text-2xl font-bold">Admin Dashboard</h1>
<div className="mt-4">
<Link to="/admin/upload" className="underline">Enviar novo vídeo</Link>
</div>
</Layout>
);
};


export default AdminDashboard;