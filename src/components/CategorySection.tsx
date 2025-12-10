import React from 'react';
import VideoCard from './VideoCard';

interface Video {
  id: string;
  title: string;
  thumbnail?: string;
  duration?: string;
}

export const CategorySection: React.FC<{ 
  title: string; 
  videos: Video[]; 
}> = ({ title, videos }) => {
  if (videos.length === 0) {
    return null;
  }
  
  return (
    <section className="mb-10">
      <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {videos.map((v) => (
          <VideoCard 
            key={v.id} 
            id={v.id} 
            title={v.title} 
            thumbnail={v.thumbnail} 
            duration={v.duration} 
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
