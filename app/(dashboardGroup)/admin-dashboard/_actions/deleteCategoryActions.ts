"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { DeleteCategoryState } from "./categoryActions.interface";

export const deleteCategoryAction = async (
  categoryId: string,
): Promise<DeleteCategoryState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not logged in." };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const result = await res.json();
    if (result.success) revalidatePath("/admin-dashboard/categories");
    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
