import React from 'react';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';


export const VideoCard: React.FC<{ id: string; title: string; thumbnail?: string; duration?: string; }> = ({ id, title, thumbnail, duration }) => {
return (
<Card className="w-full">
<Link to={`/watch/${id}`} className="block">
<div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-2">
{thumbnail ? <img src={thumbnail} alt={title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>}
</div>
<div className="flex items-center justify-between">
<div className="font-medium">{title}</div>
{duration && <div className="text-xs text-gray-500">{duration}</div>}
</div>
</Link>
</Card>
);
};


export default VideoCard;
