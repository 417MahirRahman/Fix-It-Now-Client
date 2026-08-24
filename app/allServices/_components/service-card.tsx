import { Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ServiceCardProps {
  service_name: string;
  price: number;
  categoryName: string;
  technicianName: string;
  technicianId: string;
}

export function ServiceCard({
  service_name,
  price,
  categoryName,
  technicianName,
}: ServiceCardProps) {
  return (
    <Card className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50">
      <CardHeader className="pb-3 pt-5">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
            <Wrench className="size-5 text-primary/70 group-hover:text-primary transition-colors" />
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <CardTitle className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {service_name}
            </CardTitle>
            <Badge
              variant="secondary"
              className="text-[10px] font-medium px-1.5 py-0"
            >
              {categoryName}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 justify-between gap-3 pt-0">
        <div className="flex items-center gap-2.5 text-sm">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
            <span className="text-xs font-semibold text-muted-foreground">
              {technicianName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground leading-none mb-0.5">
              Technician
            </p>
            <p className="text-sm font-medium truncate">{technicianName}</p>
          </div>
        </div>

        <Separator className="opacity-50" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              Price
            </p>
            <span className="text-xl font-bold tracking-tight text-foreground">
              ${Number(price).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Ring overlay for depth */}
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
    </Card>
  );
}
