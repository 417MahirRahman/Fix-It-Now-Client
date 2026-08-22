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

export default async function TechnicianPaymentsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) redirect("/login");

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/technician`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    },
  );

  let payments = [];

  if (res.ok) {
    const result = await res.json();
    if (result.data) {
      payments = result.data;
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Payments Received</h1>
      <p className="text-muted-foreground mb-6">
        All payments made to you by customers.
      </p>

      {payments.length === 0 && (
        <p className="text-muted-foreground">No payments received yet.</p>
      )}

      {payments.length > 0 && (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From (Customer)</TableHead>
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
                if (payment.user) {
                  customerName = payment.user.name;
                }

                let serviceName = "—";
                if (payment.booking && payment.booking.service) {
                  serviceName = payment.booking.service.service_name;
                }

                let transactionId = "—";
                if (payment.transactionId) {
                  transactionId = payment.transactionId;
                }

                const amountText = "$" + Number(payment.amount).toFixed(2);

                let dateText = "";
                if (payment.paidAt) {
                  dateText = new Date(payment.paidAt).toLocaleDateString();
                } else {
                  dateText = new Date(payment.createdAt).toLocaleDateString();
                }

                const badgeColor = statusVariant[payment.status] || "outline";

                return (
                  <TableRow key={payment.id}>
                    <TableCell>{customerName}</TableCell>
                    <TableCell>{serviceName}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {transactionId}
                    </TableCell>
                    <TableCell>{amountText}</TableCell>
                    <TableCell>
                      <Badge variant={badgeColor}>{payment.status}</Badge>
                    </TableCell>
                    <TableCell>{dateText}</TableCell>
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
