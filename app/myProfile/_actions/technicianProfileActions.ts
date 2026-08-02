"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { TechnicianProfileState } from "./profileActions.interface";

export const updateTechnicianProfileAction = async (
  prevState: TechnicianProfileState,
  formData: FormData,
): Promise<TechnicianProfileState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not logged in." };
  }

  const payload = {
    bio: formData.get("bio") || undefined,
    experienceYears: formData.get("experienceYears")
      ? Number(formData.get("experienceYears"))
      : undefined,
  };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/profile`,
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
    if (result.success) revalidatePath("/profile");
    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
