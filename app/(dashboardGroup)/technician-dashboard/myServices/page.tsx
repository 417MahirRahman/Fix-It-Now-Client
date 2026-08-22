/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MyServiceCard } from "../_components/my-service-card";

export default async function MyServicesPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) redirect("/login");

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  let profile: any = null;
  if (res.ok) {
    const result = await res.json();
    profile = result.data?.profile;
  }

  const services = profile?.technicianProfile?.services ?? [];
  const availability = profile?.technicianProfile?.availability ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Services</h1>
      <p className="text-muted-foreground mb-6">
        Manage your listed services and availability.
      </p>

      {services.length === 0 ? (
        <p className="text-muted-foreground">No services yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service: any) => (
            <MyServiceCard
              key={service.id}
              id={service.id}
              service_name={service.service_name}
              price={service.price}
              categoryName={service.category?.category_name}
              availability={availability}
            />
          ))}
        </div>
      )}
    </div>
  );
}
