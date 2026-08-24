import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ReviewButton } from "../../_components/review-button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) redirect("/login");

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (res.status === 404) notFound();

  const result = await res.json();
  const booking = result.data;

  if (!booking) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Booking Details</h1>
        <Badge>{booking.status}</Badge>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Service</p>
            <p className="font-semibold">{booking.service?.service_name}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Customer</p>
              <p>{booking.customer?.name}</p>
              <p className="text-sm text-muted-foreground">
                {booking.customer?.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Technician</p>
              <p>{booking.technician?.name}</p>
              <p className="text-sm text-muted-foreground">
                {booking.technician?.phone}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Scheduled Time</p>
              <p>{new Date(booking.scheduledTime).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p>${Number(booking.service?.price ?? 0).toFixed(2)}</p>
            </div>
          </div>

          {booking.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p>{booking.notes}</p>
              </div>
            </>
          )}

          {booking.payment && (
            <>
              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>

                <Badge
                  variant={
                    booking.payment.status === "Paid" ? "default" : "outline"
                  }
                >
                  {booking.payment.status}
                </Badge>
              </div>
            </>
          )}

          {booking.status === "Completed" && !booking.review && (
            <>
              <Separator />

              <div>
                <ReviewButton bookingId={booking.id} />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
