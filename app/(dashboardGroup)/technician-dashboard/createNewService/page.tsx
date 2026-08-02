import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreateServiceForm } from "../_components/create-service-form";
import { SetAvailabilityButton } from "../_components/set-availability-button";

export default function CreateNewServicePage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full sm:max-w-lg p-4 sm:p-6 md:p-8 shadow-lg">
        <CardHeader className="p-0 pb-4 sm:pb-6 text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
            CREATE NEW SERVICE
          </CardTitle>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Add a new service you offer, and set when you are available
          </p>
        </CardHeader>
        <CardContent className="p-0 space-y-6">
          <CreateServiceForm />
          <Separator />
          <SetAvailabilityButton />
        </CardContent>
      </Card>
    </div>
  );
}
