"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
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
    phone: formData.get("phone"),
    address: formData.get("address"),
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
    if (result.success) revalidatePath("/profile");
    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
