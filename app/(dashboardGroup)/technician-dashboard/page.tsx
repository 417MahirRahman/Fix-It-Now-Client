/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ClipboardList, CreditCard, Wrench, Star, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatCard } from "../_components/stat-card";

const bookingStatusVariant: Record<string, any> = {
  Requested: "outline",
  Accepted: "secondary",
  Declined: "destructive",
  InProgress: "default",
  Completed: "default",
  Cancelled: "destructive",
};
const paymentStatusVariant: Record<string, any> = {
  Pending: "outline",
  Completed: "default",
  Failed: "destructive",
};

export default async function TechnicianDashboardPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) redirect("/login");

  const headers = { Authorization: `Bearer ${accessToken}` };

  const [bookingsRes, paymentsRes, meRes] = await Promise.all([
    fetch(`${process.env.BACKEND_API_URL}/api/technician/bookings`, {
      headers,
      cache: "no-store",
    }),
    fetch(`${process.env.BACKEND_API_URL}/api/payments/technician`, {
      headers,
      cache: "no-store",
    }),
    fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
      headers,
      cache: "no-store",
    }),
  ]);

  const bookings = (await bookingsRes.json()).data ?? [];
  const payments = (await paymentsRes.json()).data ?? [];
  const profile = (await meRes.json()).data?.profile;
  const services = profile?.technicianProfile?.services ?? [];

  const pendingRequests = bookings.filter(
    (b: any) => b.status === "Requested",
  ).length;
  const totalEarnings = payments
    .filter((p: any) => p.status === "Completed")
    .reduce((sum: number, p: any) => sum + Number(p.amount), 0);

  const recentBookings = bookings.slice(0, 6);
  const recentServices = services.slice(0, 4);
  const recentPayments = payments.slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your jobs and earnings.
          </p>
        </div>
        <Button asChild>
          <Link href="/technician-dashboard/services/new">
            <Plus className="size-4" /> New Service
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={ClipboardList}
          label="Pending Requests"
          value={pendingRequests}
        />
        <StatCard
          icon={Wrench}
          label="Active Services"
          value={services.length}
        />
        <StatCard
          icon={CreditCard}
          label="Total Earnings"
          value={`$${totalEarnings.toFixed(2)}`}
        />
        <StatCard
          icon={ClipboardList}
          label="Total Bookings"
          value={bookings.length}
        />
      </div>

      {/* Recent Bookings */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Booking Requests</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/technician-dashboard/bookings">View all</Link>
          </Button>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-muted-foreground text-sm">No bookings yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentBookings.map((booking: any) => (
              <Card key={booking.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm">
                      {booking.service?.service_name}
                    </h3>
                    <Badge
                      variant={
                        bookingStatusVariant[booking.status] ?? "outline"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Customer: {booking.customer?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(booking.scheduledTime).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* My Services preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">My Services</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/technician-dashboard/services">View all</Link>
          </Button>
        </div>

        {recentServices.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No services listed yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentServices.map((service: any) => (
              <Card key={service.id}>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm">
                    {service.service_name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      ${Number(service.price).toFixed(2)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      {service.rating.toFixed(1)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Recent Payments */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/technician-dashboard/payments">View all</Link>
          </Button>
        </div>

        {recentPayments.length === 0 ? (
          <p className="text-muted-foreground text-sm">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment: any) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.user?.name}</TableCell>
                    <TableCell>
                      {payment.booking?.service?.service_name}
                    </TableCell>
                    <TableCell>${Number(payment.amount).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          paymentStatusVariant[payment.status] ?? "outline"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(
                        payment.paidAt ?? payment.createdAt,
                      ).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}
