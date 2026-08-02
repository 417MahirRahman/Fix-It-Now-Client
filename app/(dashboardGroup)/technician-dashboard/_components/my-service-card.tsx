import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditAvailabilityDialog } from "./update-availability-dialog";
import { EditServiceDialog } from "./update-service-dialog";

interface Slot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface MyServiceCardProps {
  id: string;
  service_name: string;
  price: number;
  rating: number;
  categoryName: string;
  availability: Slot[];
}

export function MyServiceCard({
  id,
  service_name,
  price,
  rating,
  categoryName,
  availability,
}: MyServiceCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{service_name}</CardTitle>
          <Badge variant="secondary">{categoryName}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            ${Number(price).toFixed(2)}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-3.5 fill-yellow-400 text-yellow-400" />{" "}
            {rating.toFixed(1)}
          </span>
        </div>
        <div className="flex gap-2">
          <EditServiceDialog
            serviceId={id}
            currentName={service_name}
            currentPrice={price}
          />
          <EditAvailabilityDialog slots={availability} />
        </div>
      </CardContent>
    </Card>
  );
}
