import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface BookingCardProps {
  id: string;
  serviceName: string;
  technicianName: string;
  scheduledTime: string;
  status: string;
}

export function BookingCard({
  id,
  serviceName,
  technicianName,
  scheduledTime,
  status,
}: BookingCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{serviceName}</h3>
            <Badge variant={statusVariant[status] ?? "outline"}>{status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Technician: {technicianName}
          </p>
          <p className="text-sm text-muted-foreground">
            {new Date(scheduledTime).toLocaleString()}
          </p>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href={`/dashboard/bookings/${id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
