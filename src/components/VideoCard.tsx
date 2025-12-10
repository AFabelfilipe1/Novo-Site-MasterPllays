import React, { useState } from 'react';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';

export const VideoCard: React.FC<{ 
  id: string; 
  title: string; 
  thumbnail?: string; 
  duration?: string; 
}> = ({ id, title, thumbnail, duration }) => {
  const [imgError, setImgError] = useState(false);
  
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <Link to={`/watch/${id}`} className="block">
        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-2 relative">
          {thumbnail && !imgError ? (
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-sm">No thumbnail</div>
              </div>
            </div>
          )}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
              {duration}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="font-medium truncate pr-2" title={title}>
            {title}
          </div>
          {duration && <div className="text-xs text-gray-500 shrink-0">{duration}</div>}
        </div>
      </Link>
    </Card>
  );
};

export default VideoCard;
