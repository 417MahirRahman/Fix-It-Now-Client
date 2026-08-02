"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateBookingStatusAction } from "../_actions/bookingStatusActions";

interface BookingStatusActionsProps {
  bookingId: string;
  status: string;
}

export function BookingStatusActions({
  bookingId,
  status,
}: BookingStatusActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (newStatus: string) => {
    startTransition(async () => {
      const result = await updateBookingStatusAction(bookingId, newStatus);
      if (result.success) {
        toast.success(`Booking marked as ${newStatus}.`);
      } else {
        toast.error(result.message);
      }
    });
  };

  if (status === "Requested") {
    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          disabled={isPending}
          onClick={() => handleUpdate("Accepted")}
        >
          Accept
        </Button>
        <Button
          size="sm"
          variant="destructive"
          disabled={isPending}
          onClick={() => handleUpdate("Declined")}
        >
          Decline
        </Button>
      </div>
    );
  }

  if (status === "InProgress") {
    return (
      <Button
        size="sm"
        disabled={isPending}
        onClick={() => handleUpdate("Completed")}
      >
        Mark Completed
      </Button>
    );
  }

  return null; // Accepted (waiting for payment), Paid, Completed, Declined, Cancelled — no technician action available
}
