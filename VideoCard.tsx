import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface VideoCardProps {
  id: number | string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  views: string;
  className?: string;
}

export default function VideoCard({ id, title, category, thumbnail, duration, views, className }: VideoCardProps) {
  return (
    <Link href={`/watch/${id}`}>
      <div className={cn("group relative rounded-xl overflow-hidden cursor-pointer glass-card", className)}>
      {/* Thumbnail Container */}
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
          <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/20">
            <Play className="w-5 h-5 text-white fill-white ml-1" />
          </div>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white border border-white/10">
          {duration}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            {category}
          </span>
          <span className="text-xs text-white/40">{views} views</span>
        </div>
        
        <h3 className="text-white font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
      </div>
    </div>
    </Link>
  );
}
