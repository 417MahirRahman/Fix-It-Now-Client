import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PaymentResultProps {
  status: "success" | "failed";
  title: string;
  message: string;
  buttonHref?: string;
  buttonLabel?: string;
}

export function PaymentResult({
  status,
  title,
  message,
  buttonHref = "/dashboard/bookings",
  buttonLabel = "Go to My Bookings",
}: PaymentResultProps) {
  const isSuccess = status === "success";

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-lg text-center">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {isSuccess ? (
            <CheckCircle2 className="mx-auto size-14 text-green-600" />
          ) : (
            <XCircle className="mx-auto size-14 text-destructive" />
          )}
          <p className="text-muted-foreground">{message}</p>
          <Button asChild className="w-full h-11">
            <Link href={buttonHref}>{buttonLabel}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
