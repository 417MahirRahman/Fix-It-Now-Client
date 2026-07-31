"use server";

import { RegisterState } from "./registerActions.interface";

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    role: formData.get("role") || "Customer",
  };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
      errorMessage: error,
    };
  }
};
