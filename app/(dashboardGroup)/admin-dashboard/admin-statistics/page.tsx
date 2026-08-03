/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statusVariant: any = {
  Pending: "outline",
  Paid: "default",
  Failed: "destructive",
};

export default async function AdminPaymentsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  const response = await fetch(
    process.env.BACKEND_API_URL + "/api/admin/bookings",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      cache: "no-store",
    },
  );

  let bookings: any[] = [];

  if (response.ok) {
    const result = await response.json();
    if (result.data) {
      bookings = result.data;
    }
  }

  const payments = [];

  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    if (booking.payment) {
      const payment = booking.payment;
      payment.booking = booking;
      payments.push(payment);
    }
  }

  function formatDate(payment: any) {
    if (payment.paidAt) {
      const date = new Date(payment.paidAt);
      return date.toLocaleDateString();
    } else {
      const date = new Date(payment.createdAt);
      return date.toLocaleDateString();
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">All Transactions</h1>
      <p className="text-muted-foreground mb-6">
        Every payment made across the platform.
      </p>

      {payments.length === 0 && (
        <p className="text-muted-foreground">No transactions yet.</p>
      )}

      {payments.length > 0 && (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From (Customer)</TableHead>
                <TableHead>To (Technician)</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment: any) => {
                let customerName = "—";
                if (payment.booking.customer) {
                  customerName = payment.booking.customer.name;
                }

                let technicianName = "—";
                if (payment.booking.technician) {
                  technicianName = payment.booking.technician.name;
                }

                let serviceName = "—";
                if (payment.booking.service) {
                  serviceName = payment.booking.service.service_name;
                }

                let transactionId = "—";
                if (payment.transactionId) {
                  transactionId = payment.transactionId;
                }

                const amountText = "$" + Number(payment.amount).toFixed(2);

                const badgeColor = statusVariant[payment.status] || "outline";

                return (
                  <TableRow key={payment.id}>
                    <TableCell>{customerName}</TableCell>
                    <TableCell>{technicianName}</TableCell>
                    <TableCell>{serviceName}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {transactionId}
                    </TableCell>
                    <TableCell>{amountText}</TableCell>
                    <TableCell>
                      <Badge variant={badgeColor}>{payment.status}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(payment)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
