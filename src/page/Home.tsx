import React from 'react';
import Layout from '../components/Layout';
import CategorySection from '../components/CategorySection';


const mock = Array.from({length:8}).map((_,i) => ({ id: `v${i}`, title: `Vídeo ${i+1}`, thumbnail: undefined }));


export const Home: React.FC = () => {
return (
<Layout>
<h1 className="text-2xl font-bold mb-4">Página inicial</h1>
<CategorySection title="Em alta" videos={mock} />
<CategorySection title="Novidades" videos={mock} />
</Layout>
);
};


export default Home;