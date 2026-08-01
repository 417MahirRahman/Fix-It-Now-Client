"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createBookingAction } from "../_actions/bookingActions";
import { BookingState } from "../_actions/bookingActions.interface";

const initialState: BookingState = { success: false, message: "" };

interface BookServiceButtonProps {
  serviceId: string;
  serviceName: string;
}

export function BookServiceButton({
  serviceId,
  serviceName,
}: BookServiceButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    createBookingAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success("Booking created successfully!");
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Book Now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book {serviceName}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="serviceId" value={serviceId} />

          <div className="space-y-2">
            <Label htmlFor="scheduledTime">Preferred Date & Time</Label>
            <Input
              id="scheduledTime"
              name="scheduledTime"
              type="datetime-local"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input
              id="notes"
              name="notes"
              type="text"
              placeholder="e.g. Please bring extra fittings"
              className="h-11"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
