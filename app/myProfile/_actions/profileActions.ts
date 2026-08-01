"use server";

import { cookies } from "next/headers";
import { ProfileState } from "./profileActions.interface";

export const updateProfileAction = async (
  prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not logged in." };
  }

  const payload = {
    name: formData.get("name"),
    bio: formData.get("bio") || undefined,
    experienceYears: formData.get("experienceYears")
      ? Number(formData.get("experienceYears"))
      : undefined,
  };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/my-profile`,
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
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong. Please try again. Error: ${error}`,
    };
  }
};
