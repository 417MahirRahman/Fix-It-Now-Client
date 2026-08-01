import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  service_name: string;
  price: number;
  rating: number;
  categoryName: string;
  technicianName: string;
}

export function ServiceCard({
  service_name,
  price,
  rating,
  categoryName,
  technicianName,
}: ServiceCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{service_name}</CardTitle>
          <Badge variant="secondary">{categoryName}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <p className="text-sm text-muted-foreground">by {technicianName}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-semibold">
            ${Number(price).toFixed(2)}
          </span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
            {rating}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
