/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  User,
  Wrench,
  Clock,
  DollarSign,
  CalendarCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarDays className="size-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              All Bookings
            </h1>
            <p className="text-muted-foreground mt-1">
              View every booking across the platform
            </p>
          </div>
        </div>

        {/* Stats badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <CalendarCheck className="size-4" />
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}{" "}
          total
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="pt-12 pb-12 text-center">
            <CalendarDays className="size-16 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
            <p className="text-muted-foreground text-sm">
              There are no bookings on the platform yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking: any) => (
            <Card
              key={booking.id}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-60 group-hover:opacity-100 transition-opacity" />

              <CardContent className="p-5">
                {/* Header: Service name + Status */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4 pb-4 border-b border-border/50">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                      <Wrench className="size-5 text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors truncate">
                        {booking.service?.service_name ?? "Unknown Service"}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Booking ID: {booking.id}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className="shrink-0 text-xs font-medium px-3 py-1"
                  >
                    {booking.status}
                  </Badge>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <User className="size-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                        Customer
                      </p>
                      <p className="text-sm font-medium truncate">
                        {booking.customer?.name ?? "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Wrench className="size-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                        Technician
                      </p>
                      <p className="text-sm font-medium truncate">
                        {booking.technician?.name ?? "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Clock className="size-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                        Scheduled
                      </p>
                      <p className="text-sm font-medium">
                        {booking.scheduledTime
                          ? new Date(booking.scheduledTime).toLocaleString()
                          : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <DollarSign className="size-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                        Price
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        ${Number(booking.service?.price ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Ring overlay for depth */}
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
