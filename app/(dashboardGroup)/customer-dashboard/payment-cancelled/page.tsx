import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PaymentCancelledPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>

        <p className="mt-2">
          Your payment was cancelled or could not be completed.
        </p>

        <p className="mt-2">No charge was made.</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/customer-dashboard/myBookings">
            Back to My Service Page
          </Link>
        </Button>
      </div>
    </div>
  );
}
