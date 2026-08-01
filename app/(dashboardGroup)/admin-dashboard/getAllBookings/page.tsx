/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Requested: "outline",
  Accepted: "secondary",
  Declined: "destructive",
  Paid: "secondary",
  InProgress: "default",
  Completed: "default",
  Cancelled: "destructive",
};

export default async function AdminBookingsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) redirect("/login");

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/bookings`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const result = await res.json();
  const bookings = result.data ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">All Bookings</h1>
      <p className="text-muted-foreground mb-6">
        View every booking across the platform.
      </p>

      {bookings.length === 0 ? (
        <p className="text-muted-foreground">No bookings found.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking: any) => (
            <Card key={booking.id}>
              <CardContent className="p-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">
                    {booking.service?.service_name}
                  </h3>
                  <Badge variant={statusVariant[booking.status] ?? "outline"}>
                    {booking.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-muted-foreground">
                  <p>Customer: {booking.customer?.name}</p>
                  <p>Technician: {booking.technician?.name}</p>
                  <p>
                    Scheduled:{" "}
                    {new Date(booking.scheduledTime).toLocaleString()}
                  </p>
                  <p>
                    Price: ${Number(booking.service?.price ?? 0).toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
