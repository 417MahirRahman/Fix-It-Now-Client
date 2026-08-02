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

const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Pending: "outline",
  Completed: "default",
  Failed: "destructive",
};

export default async function CustomerPaymentsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) redirect("/login");

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const result = await res.json();
  const payments = result.data ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Payment History</h1>
      <p className="text-muted-foreground mb-6">
        All payments you&apos;ve made.
      </p>

      {payments.length === 0 ? (
        <p className="text-muted-foreground">No payments yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>To (Technician)</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment: any) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.booking?.technician?.name}</TableCell>
                  <TableCell>
                    {payment.booking?.service?.service_name}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {payment.transactionId ?? "—"}
                  </TableCell>
                  <TableCell>${Number(payment.amount).toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[payment.status] ?? "outline"}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString()
                      : new Date(payment.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
