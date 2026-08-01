"use server";

import { cookies } from "next/headers";
import { BookingState } from "./bookingActions.interface";

export const createBookingAction = async (
  prevState: BookingState,
  formData: FormData,
): Promise<BookingState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Please log in to book a service." };
  }

  const payload = {
    serviceId: formData.get("serviceId"),
    scheduledTime: formData.get("scheduledTime"),
    notes: formData.get("notes") || undefined,
  };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong. Please try again. ${error}`,
    };
  }
};
