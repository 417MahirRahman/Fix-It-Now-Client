"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { StarRatingInput } from "./star-rating-input";
import { createReviewAction } from "../_actions/reviewActions";
import { ReviewState } from "../_actions/reviewActions.interface";

const initialState: ReviewState = { success: false, message: "" };

interface ReviewButtonProps {
  bookingId: string;
}

export function ReviewButton({ bookingId }: ReviewButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    createReviewAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success("Review submitted successfully!");
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Give Review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="bookingId" value={bookingId} />

          <div className="space-y-2">
            <Label>Your Rating</Label>
            <StarRatingInput name="rating" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">Comment (optional)</Label>
            <Textarea
              id="review"
              name="review"
              placeholder="Share your experience..."
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
