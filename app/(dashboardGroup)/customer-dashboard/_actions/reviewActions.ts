"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ReviewState } from "./reviewActions.interface";

export const createReviewAction = async (
  prevState: ReviewState,
  formData: FormData,
): Promise<ReviewState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please log in to leave a review.",
    };
  }

  const bookingId = formData.get("bookingId")?.toString();
  const ratingValue = formData.get("rating")?.toString();
  const reviewValue = formData.get("review")?.toString();

  if (!bookingId) {
    return {
      success: false,
      message: "Booking ID is required.",
    };
  }

  if (!ratingValue) {
    return {
      success: false,
      message: "Please select a star rating.",
    };
  }

  const rating = Number(ratingValue);

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return {
      success: false,
      message: "Rating must be between 1 and 5.",
    };
  }

  const payload = {
    bookingId,
    rating,
    review: reviewValue?.trim() || undefined,
  };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result?.message || "Failed to submit review.",
      };
    }

    revalidatePath(`/customer-dashboard/myBookings/${bookingId}`);

    revalidatePath("/customer-dashboard/myBookings");

    return {
      success: true,
      message: "Review submitted successfully.",
    };
  } catch (error) {
    console.error("Review submission failed:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
