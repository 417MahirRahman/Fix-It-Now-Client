import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PaymentResult } from "../_components/payment-result";

export default async function PaymentCancelledPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) redirect("/login");

  return (
    <PaymentResult
      status="failed"
      title="Payment Failed"
      message="Your payment was cancelled or could not be completed. No charge was made."
    />
  );
}
