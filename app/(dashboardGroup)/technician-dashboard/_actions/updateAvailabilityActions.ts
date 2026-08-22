'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { AvailabilityState } from "./technician.interface";

export const updateAvailabilityAction = async (
  availabilityId: string,
  prevState: AvailabilityState,
  formData: FormData,
): Promise<AvailabilityState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken)
    return { success: false, message: "You are not logged in." };

  const payload = {
    dayOfWeek: formData.get("dayOfWeek") || undefined,
    startTime: formData.get("startTime") || undefined,
    endTime: formData.get("endTime") || undefined,
  };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/availability/${availabilityId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );
    const result = await res.json();
    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
