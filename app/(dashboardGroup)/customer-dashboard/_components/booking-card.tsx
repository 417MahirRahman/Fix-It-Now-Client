"use client";

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
  accessToken: string;
}

export function BookingCard({
  id,
  serviceName,
  technicianName,
  scheduledTime,
  status,
  accessToken,
}: BookingCardProps) {
  const handlePayment = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ bookingId: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        const checkoutUrl = result?.data?.checkoutUrl;
        window.location.href = checkoutUrl;
      })
      .catch((error) => {
        console.error("Payment failed:", error);
      });
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
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

        <div className="flex gap-2">
          {status === "Requested" ? null : status === "Completed" ? (
            <Button variant="outline" size="sm" disabled>
              Paid
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handlePayment}>
              Pay Now
            </Button>
          )}

          <Button asChild variant="outline" size="sm">
            <Link href={`/customer-dashboard/myBookings/${id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}