import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  description?: string;
}

export function CategoryCard({ name, description }: CategoryCardProps) {
  return (
      <Card className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-60 group-hover:opacity-100 transition-opacity" />

        <CardContent className="flex flex-col flex-1 p-5 space-y-3">
          <div className="flex-1 space-y-2">
            <h3 className="text-base font-semibold leading-tight group-hover:text-primary transition-colors">
              {name}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </CardContent>

        {/* Ring overlay for depth */}
        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
      </Card>
  );
}
