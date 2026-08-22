import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditAvailabilityDialog } from "./update-availability-dialog";
import { EditServiceDialog } from "./update-service-dialog";
import { DeleteServiceButton } from "./delete-service-button";

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
  categoryName: string;
  availability: Slot[];
}

export function MyServiceCard({
  id,
  service_name,
  price,
  categoryName,
  availability,
}: MyServiceCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{service_name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{categoryName}</Badge>
            <DeleteServiceButton serviceId={id} serviceName={service_name} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            ${Number(price).toFixed(2)}
          </span>
        </div>

        {availability.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {availability.map((slot) => (
              <Badge key={slot.id} variant="outline" className="gap-1 text-xs">
                <Clock className="size-3" />
                {slot.dayOfWeek} {slot.startTime}–{slot.endTime}
              </Badge>
            ))}
          </div>
        )}

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
