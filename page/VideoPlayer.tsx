import React from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';


export const VideoPlayer: React.FC = () => {
const { id } = useParams();
return (
<Layout>
<div className="prose">
<h1>Player — {id}</h1>
<div className="bg-black aspect-video mb-4 flex items-center justify-center text-white">Player (mock)</div>
<p>Descrição do vídeo...</p>
</div>
</Layout>
);
};


export default VideoPlayer;