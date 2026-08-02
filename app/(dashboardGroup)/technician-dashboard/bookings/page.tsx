/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TechnicianBookingCard } from "../_components/technician-booking-card";

export default async function TechnicianBookingsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) redirect("/login");

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technician/bookings`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    },
  );
  const result = await res.json();
  const bookings = result.data ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Booking Requests</h1>
      <p className="text-muted-foreground mb-6">
        Manage incoming booking requests.
      </p>

      {bookings.length === 0 ? (
        <p className="text-muted-foreground">No bookings yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking: any) => (
            <TechnicianBookingCard
              key={booking.id}
              id={booking.id}
              serviceName={booking.service?.service_name}
              customerName={booking.customer?.name}
              scheduledTime={booking.scheduledTime}
              status={booking.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}
