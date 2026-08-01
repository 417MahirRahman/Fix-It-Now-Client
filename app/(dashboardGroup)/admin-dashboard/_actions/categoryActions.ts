"use server";

import { cookies } from "next/headers";
import { CategoryState } from "./categoryActions.interface";

export const createCategoryAction = async (
  prevState: CategoryState,
  formData: FormData,
): Promise<CategoryState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not logged in." };
  }

  const payload = {
    category_name: formData.get("category_name") as string,
    description: formData.get("description") || undefined,
  };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/categories`,
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
    return result;
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong. Please try again. ${error}`,
    };
  }
};
