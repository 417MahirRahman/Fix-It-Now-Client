"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdateStatusState } from "./adminActions.interface";

export const updateUserStatusAction = async (
  userId: string,
  currentStatus: "Active" | "Banned",
): Promise<UpdateStatusState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not logged in." };
  }

  const newStatus = currentStatus === "Active" ? "Banned" : "Active";

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      },
    );

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin/users");
      return {
        success: true,
        message: `User ${newStatus.toLowerCase()} successfully.`,
      };
    }

    return { success: false, message: result.message || "Update failed." };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong. Please try again. ${error}`,
    };
  }
};
