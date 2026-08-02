"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { AvailabilityState } from "./technician.interface";

export const createAvailabilityAction = async (
  prevState: AvailabilityState,
  formData: FormData,
): Promise<AvailabilityState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken)
    return { success: false, message: "You are not logged in." };

  const payload = {
    dayOfWeek: formData.get("dayOfWeek"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
  };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/availability`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );
    const result = await res.json();
    if (result.success) revalidatePath("/technician-dashboard/services");
    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
