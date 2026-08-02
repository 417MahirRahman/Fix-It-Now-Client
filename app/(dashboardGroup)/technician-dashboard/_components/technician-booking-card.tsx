import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingStatusActions } from "./booking-status";

const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Requested: "outline",
  Accepted: "secondary",
  Declined: "destructive",
  InProgress: "default",
  Completed: "default",
  Cancelled: "destructive",
};

interface TechnicianBookingCardProps {
  id: string;
  serviceName: string;
  customerName: string;
  scheduledTime: string;
  status: string;
}

export function TechnicianBookingCard({
  id,
  serviceName,
  customerName,
  scheduledTime,
  status,
}: TechnicianBookingCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{serviceName}</h3>
            <Badge variant={statusVariant[status] ?? "outline"}>{status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Customer: {customerName}
          </p>
          <p className="text-sm text-muted-foreground">
            {new Date(scheduledTime).toLocaleString()}
          </p>
        </div>
        <BookingStatusActions bookingId={id} status={status} />
      </CardContent>
    </Card>
  );
}
