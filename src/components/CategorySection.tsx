import React from 'react';
import VideoCard from './VideoCard';


export const CategorySection: React.FC<{ title: string; videos: Array<any>; }> = ({ title, videos }) => {
return (
<section className="mb-8">
<h3 className="mb-4 text-xl font-semibold">{title}</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{videos.map((v,i) => (
<VideoCard key={v.id ?? i} id={v.id ?? String(i)} title={v.title ?? 'Untitled'} thumbnail={v.thumbnail} duration={v.duration} />
))}
</div>
</section>
);
};


export default CategorySection;
