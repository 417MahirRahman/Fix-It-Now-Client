"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateTechnicianProfileAction } from "../_actions/technicianProfileActions";
import { TechnicianProfileState } from "../_actions/profileActions.interface";

const initialState: TechnicianProfileState = { success: false, message: "" };

interface EditTechnicianProfileButtonProps {
  currentBio?: string | null;
  currentExperience?: number | null;
}

export function EditTechnicianProfileButton({
  currentBio,
  currentExperience,
}: EditTechnicianProfileButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    updateTechnicianProfileAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success("Technician profile updated!");
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full h-11">
          Update Technician Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Technician Profile</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={currentBio ?? ""}
              placeholder="Tell customers about yourself and your skills..."
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base min-h-[100px] resize-y ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceYears">Experience (Years)</Label>
            <input
              id="experienceYears"
              name="experienceYears"
              type="number"
              min={0}
              max={60}
              defaultValue={currentExperience ?? 0}
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
