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

import { createAvailabilityAction } from "../_actions/availabilityActions";
import { AvailabilityState } from "../_actions/technician.interface";

const initialState: AvailabilityState = {
  success: false,
  message: "",
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function SetAvailabilityButton() {
  const [open, setOpen] = useState(false);

  const [state, formAction, pending] = useActionState(
    createAvailabilityAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message || "Availability slot added!");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full h-11">
          Set Available Time Slot
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Availability Slot</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dayOfWeek">Day</Label>

            <select
              id="dayOfWeek"
              name="dayOfWeek"
              required
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
              defaultValue="Mon"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>

              <Input
                id="startTime"
                name="startTime"
                type="time"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>

              <Input
                id="endTime"
                name="endTime"
                type="time"
                required
                className="h-11"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Saving..." : "Save Slot"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
