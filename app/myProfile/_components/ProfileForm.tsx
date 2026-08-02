"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateProfileAction } from "../_actions/profileActions";
import {
  ProfileState,
  UserProfile,
} from "../_actions/profileActions.interface";
import { EditTechnicianProfileButton } from "./update-technician-profile-button";

const initialState: ProfileState = {
  success: false,
  message: "",
};

interface ProfileFormProps {
  user: UserProfile;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const isTechnician = user.role === "Technician";

  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="w-full p-4 sm:p-6 md:p-8 shadow-lg">
      <CardHeader className="p-0 pb-4 sm:pb-6 text-center">
        <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
          MY PROFILE
        </CardTitle>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Update your personal information
        </p>
      </CardHeader>

      <CardContent className="p-0 space-y-6">
        <form action={formAction} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name}
                placeholder="Enter your name"
                required
                autoComplete="name"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                readOnly
                disabled
                className="h-11 bg-muted cursor-not-allowed"
                title="Email cannot be changed"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be edited here.
              </p>
            </div>
          </div>
          {isTechnician && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Bio</Label>
                <textarea
                  value={user.bio ?? "No bio added yet."}
                  readOnly
                  disabled
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-muted px-3 py-2 text-base min-h-[100px] resize-none cursor-not-allowed text-muted-foreground"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Experience (Years)
                  </Label>
                  <Input
                    type="text"
                    value={user.experienceYears ?? 0}
                    readOnly
                    disabled
                    className="h-11 bg-muted cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Role</Label>
                  <Input
                    type="text"
                    value={user.role}
                    readOnly
                    disabled
                    className="h-11 bg-muted cursor-not-allowed"
                  />
                </div>
              </div>
            </>
          )}

          {!isTechnician && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Role</Label>
              <Input
                type="text"
                value={user.role}
                readOnly
                disabled
                className="h-11 bg-muted cursor-not-allowed"
              />
            </div>
          )}

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              className="w-full h-11 sm:w-auto sm:min-w-[160px] text-base font-medium"
              disabled={pending}
            >
              {pending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
        {isTechnician && (
          <EditTechnicianProfileButton
            currentBio={user.bio}
            currentExperience={user.experienceYears}
          />
        )}
      </CardContent>
    </Card>
  );
}
