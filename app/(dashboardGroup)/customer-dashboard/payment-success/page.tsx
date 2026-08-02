import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PaymentResult } from "../_components/payment-result";

interface PageProps {
  searchParams: Promise<{ paymentId?: string; sessionId?: string }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const { sessionId } = await searchParams;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) redirect("/login");

  if (!sessionId) {
    return (
      <PaymentResult
        status="failed"
        title="Missing Session"
        message="No payment session was found. If you completed a payment, please check your bookings for the updated status."
      />
    );
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/confirm`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
      cache: "no-store",
    },
  );
  const result = await res.json();

  if (!result.success) {
    return (
      <PaymentResult
        status="failed"
        title="Payment Not Confirmed"
        message={
          result.message || "We couldn't verify your payment. Please try again."
        }
      />
    );
  }

  return (
    <PaymentResult
      status="success"
      title="Payment Successful"
      message="Your payment has been confirmed. Your booking is now in progress."
    />
  );
}
