"use server";

import { cookies } from "next/headers";
import { BookingStatusState } from "./technician.interface";
import { revalidatePath } from "next/cache";

export const updateBookingStatusAction = async (
  bookingId: string,
  status: string,
): Promise<BookingStatusState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken)
    return { success: false, message: "You are not logged in." };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      },
    );
    const result = await res.json();
    if (result.success) revalidatePath("/technician-dashboard/bookings");
    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
