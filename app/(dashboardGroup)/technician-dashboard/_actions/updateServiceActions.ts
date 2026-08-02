"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ServiceState } from "./technician.interface";

export const updateServiceAction = async (
  serviceId: string,
  prevState: ServiceState,
  formData: FormData,
): Promise<ServiceState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken)
    return { success: false, message: "You are not logged in." };

  const payload = {
    service_name: formData.get("service_name") || undefined,
    price: formData.get("price") ? Number(formData.get("price")) : undefined,
  };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/services/${serviceId}`,
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
    if (result.success) revalidatePath("/technician-dashboard/services");
    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
