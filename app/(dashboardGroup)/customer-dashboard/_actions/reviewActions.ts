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
    return { success: false, message: "Please log in to leave a review." };
  }

  const bookingId = formData.get("bookingId");
  const rating = formData.get("rating");
  const review = formData.get("review");

  if (!rating) {
    return { success: false, message: "Please select a star rating." };
  }

  const payload = {
    bookingId,
    rating: Number(rating),
    review: review || undefined,
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

    if (result.success) {
      revalidatePath(`/dashboard/bookings/${bookingId}`);
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong. Please try again. ${error}`,
    };
  }
};
