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
  const handlePayment = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payments/create`;

      console.log("Payment URL:", url);
      console.log("Access Token:", accessToken);
      console.log("Booking ID:", id);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          bookingId: id,
        }),
      });

      const result = await response.json();

      console.log("Payment status:", response.status);
      console.log("Payment response:", result);

      if (!response.ok) {
        throw new Error(
          result?.error ||
            result?.message ||
            "Failed to create payment session",
        );
      }

      const checkoutUrl = result?.data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("Stripe checkout URL is missing");
      }

      console.log("Stripe checkout URL:", checkoutUrl);

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handleCancel = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/bookings/${id}/cancel`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      console.log("Cancel status:", response.status);
      console.log("Cancel response:", result);

      if (!response.ok) {
        throw new Error(
          result?.error || result?.message || "Failed to cancel booking",
        );
      }
      window.location.reload();
    } catch (error) {
      console.error("Cancel booking failed:", error);
    }
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
          {status === "Declined" || status === "Cancelled" ? null : status === "Requested" ? (
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          ) : status === "Completed" || status === "InProgress" ? (
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