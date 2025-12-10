import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';


export const NotFound: React.FC = () => (
<Layout>
<div className="text-center py-20">
<h1 className="text-3xl font-bold">404 — Não encontrado</h1>
<p className="mt-4">A página que você procura não existe.</p>
<Link to="/" className="mt-6 inline-block underline">Voltar para a home</Link>
</div>
</Layout>
);


export default NotFound;