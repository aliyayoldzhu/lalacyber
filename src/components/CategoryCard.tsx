import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  count: number;
  onClick?: () => void;
}

export function CategoryCard({ name, icon: Icon, count, onClick }: CategoryCardProps) {
  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-card border border-border/50 hover:border-cyber-primary/50 transition-all duration-300 cursor-pointer hover:shadow-cyber hover:scale-[1.02] h-40"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-cyber opacity-10 group-hover:opacity-20 transition-opacity" />
      
      <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-center space-y-3">
        <div className="p-3 rounded-full bg-cyber-primary/20 group-hover:bg-cyber-primary/30 transition-colors">
          <Icon className="h-8 w-8 text-cyber-primary group-hover:text-cyber-accent transition-colors" />
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-cyber-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {count} devices
          </p>
        </div>
      </div>
    </Card>
  );
}