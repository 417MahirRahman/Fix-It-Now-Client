/* eslint-disable react-hooks/set-state-in-effect */
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
import { AvailabilityState } from "../_actions/technician.interface";
import { updateAvailabilityAction } from "../_actions/updateAvailabilityActions";

const initialState: AvailabilityState = { success: false, message: "" };
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Slot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface EditAvailabilityDialogProps {
  slots: Slot[];
}

export function EditAvailabilityDialog({ slots }: EditAvailabilityDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(slots[0]?.id ?? "");
  const boundAction = updateAvailabilityAction.bind(null, selectedId);
  const [state, formAction, pending] = useActionState(
    boundAction,
    initialState,
  );

  const selected = slots.find((s) => s.id === selectedId);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success("Availability updated!");
      setOpen(false);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  if (slots.length === 0) {
    return (
      <Button variant="outline" size="sm" disabled>
        No slots yet
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit Availability
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Availability Slot</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Slot</Label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {slots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.dayOfWeek} {s.startTime}–{s.endTime}
                </option>
              ))}
            </select>
          </div>

          {selected && (
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dayOfWeek">Day</Label>
                <select
                  id="dayOfWeek"
                  name="dayOfWeek"
                  defaultValue={selected.dayOfWeek}
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    defaultValue={selected.startTime}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End</Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    defaultValue={selected.endTime}
                    className="h-11"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? "Saving..." : "Save Slot"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
