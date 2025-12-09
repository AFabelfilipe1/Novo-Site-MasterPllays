import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategorySectionProps {
  title: string;
  description: string;
  image: string;
  align?: "left" | "right";
  className?: string;
}

export default function CategorySection({ title, description, image, align = "left", className }: CategorySectionProps) {
  return (
    <section className={cn("relative py-24 overflow-hidden", className)}>
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        {align === "right" && (
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/90 to-background/40" />
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "max-w-2xl",
          align === "right" ? "ml-auto text-right" : "mr-auto"
        )}>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-lg text-white/70 mb-8 leading-relaxed">
            {description}
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 group"
          >
            Explorar Categoria
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
