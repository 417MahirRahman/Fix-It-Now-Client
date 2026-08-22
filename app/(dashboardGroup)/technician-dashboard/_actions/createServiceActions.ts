"use server";

import { cookies } from "next/headers";
import { ServiceState } from "./technician.interface";

export const createServiceAction = async (
  prevState: ServiceState,
  formData: FormData,
): Promise<ServiceState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken)
    return { success: false, message: "You are not logged in." };

  const payload = {
    service_name: formData.get("service_name"),
    price: Number(formData.get("price")),
    categoryName: formData.get("categoryName"),
  };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
