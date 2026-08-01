/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BookingCard } from "../_components/booking-card";

export default async function MyBookingsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) redirect("/login");

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const result = await res.json();
  const bookings = result.data ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Bookings</h1>
      <p className="text-muted-foreground mb-6">
        Track the status of your service bookings.
      </p>

      {bookings.length === 0 ? (
        <p className="text-muted-foreground">No bookings yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking: any) => (
            <BookingCard
              key={booking.id}
              id={booking.id}
              serviceName={booking.service?.service_name}
              technicianName={booking.technician?.name}
              scheduledTime={booking.scheduledTime}
              status={booking.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}
