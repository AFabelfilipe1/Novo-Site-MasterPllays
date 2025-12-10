import React from 'react';
import Layout from '../components/Layout';
import { Input } from '../components/ui/input';
import Textarea from '../components/ui/textarea';
import Button from '../components/ui/button';


export const AdminUpload: React.FC = () => {
return (
<Layout>
<div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
<h2 className="text-xl font-semibold mb-4">Enviar conteúdo</h2>
<form className="flex flex-col gap-3">
<Input label="Título" name="title" />
<Textarea label="Descrição" name="description" />
<Input label="Arquivo" type="file" name="file" />
<Button type="submit">Enviar</Button>
</form>
</div>
</Layout>
);
};


export default AdminUpload;