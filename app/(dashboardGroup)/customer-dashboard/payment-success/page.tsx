import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{
    sessionId?: string;
  }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const { sessionId } = await searchParams;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  if (!sessionId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Payment Session Missing</h1>
          <p className="mt-2">We could not find the Stripe payment session.</p>
        </div>
      </div>
    );
  }

  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Backend Configuration Error</h1>
          <p className="mt-2">BACKEND_API_URL is not configured.</p>
        </div>
      </div>
    );
  }

  let result: {
    success?: boolean;
    message?: string;
  } | null = null;

  let requestError = false;

  try {
    const response = await fetch(
      `${backendUrl.replace(/\/$/, "")}/api/payments/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          sessionId,
        }),
        cache: "no-store",
      },
    );

    result = await response.json();

    console.log("Payment confirmation status:", response.status);
    console.log("Payment confirmation result:", result);

    if (!response.ok) {
      result = {
        success: false,
        message: result?.message || "Payment confirmation failed.",
      };
    }
  } catch (error) {
    console.error("Payment confirmation failed:", error);
    requestError = true;
  }

  if (requestError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Payment Confirmation Failed</h1>
          <p className="mt-2">We could not connect to the payment server.</p>
        </div>
      </div>
    );
  }

  if (!result?.success) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Payment Not Confirmed</h1>
          <p className="mt-2">
            {result?.message || "Payment confirmation failed."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-2">Your payment has been confirmed.</p>

        <p className="mt-2">Your booking is now in progress.</p>
        
        <Button asChild size="lg" className="mt-8">
          <Link href="/customer-dashboard/myBookings">
            Back to My Service Page
          </Link>
        </Button>
      </div>
    </div>
  );
}
