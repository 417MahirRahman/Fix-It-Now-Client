"use client";

import { useActionState, useState } from "react";
import { toast } from "sonner";
import {
  Calendar,
  CalendarCheck,
  FileText,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

const initialState: BookingState = {
  success: false,
  message: "",
};

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
    async (prevState: BookingState, formData: FormData) => {
     
      const scheduledTime = formData.get("scheduledTime");

      if (scheduledTime) {
        const date = new Date(scheduledTime.toString());

        if (!isNaN(date.getTime())) {
          formData.set("scheduledTime", date.toISOString());
        }
      }

      const result = await createBookingAction(prevState, formData);

      if (result.success) {
        toast.success("Booking created successfully!");
        setOpen(false);
      } else {
        toast.error(result.message);
      }

      return result;
    },
    initialState,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <CalendarCheck className="size-3.5" />
          Book Now
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden sm:max-w-md">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarCheck className="size-5" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="line-clamp-1 text-lg leading-tight">
                Book {serviceName}
              </DialogTitle>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Schedule your service appointment
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="-mx-1 h-px bg-border/60" />

        <form action={formAction} className="space-y-4">
          {/* Service ID */}
          <input type="hidden" name="serviceId" value={serviceId} />

          {/* Date & Time */}
          <div className="space-y-2">
            <Label
              htmlFor="scheduledTime"
              className="flex items-center gap-1.5 text-sm font-medium"
            >
              <Calendar className="size-3.5 text-muted-foreground" />
              Preferred Date & Time
            </Label>

            <Input
              id="scheduledTime"
              name="scheduledTime"
              type="datetime-local"
              required
              className="h-11"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label
              htmlFor="notes"
              className="flex items-center gap-1.5 text-sm font-medium"
            >
              <FileText className="size-3.5 text-muted-foreground" />
              Notes
              <span className="text-xs font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>

            <Textarea
              id="notes"
              name="notes"
              placeholder="e.g. Please bring extra fittings"
              rows={3}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Error */}
          {!state.success && state.message && (
            <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />

              <span className="leading-snug">{state.message}</span>
            </div>
          )}

          {/* Submit */}
          <DialogFooter className="pt-2 sm:justify-stretch">
            <Button
              type="submit"
              className="h-11 w-full font-medium"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  Confirm Booking
                  <ArrowRight className="ml-1.5 size-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
