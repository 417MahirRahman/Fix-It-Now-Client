/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from "next/navigation";
import { Star, MapPin, Briefcase, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookServiceButton } from "../_components/book-service-button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TechnicianDetailPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technician/${id}`,
    {
      cache: "no-store",
    },
  );

  if (res.status === 404) {
    notFound();
  }

  const result = await res.json();
  const tech = result.data;
  console.log("Fetched technician:", tech);

  if (!tech) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Avatar className="size-20">
          <AvatarImage src="" alt={tech.user.name} />
          <AvatarFallback className="text-xl">
            {tech.user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold">{tech.user.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              {tech.avgRating} ({tech?.reviews?.length || 0} reviews)
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="size-4" /> {tech.experienceYears} yrs
              experience
            </span>
            {tech.user.address && (
              <span className="flex items-center gap-1">
                <MapPin className="size-4" /> {tech.user.address}
              </span>
            )}
          </div>
        </div>
      </div>

      {tech.bio && <p className="text-muted-foreground">{tech.bio}</p>}

      {/* Availability */}
      {tech.availability?.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Availability</h2>
          <div className="flex flex-wrap gap-2">
            {tech.availability.map((slot: any) => (
              <Badge key={slot.id} variant="outline" className="gap-1.5">
                <Clock className="size-3.5" />
                {slot.dayOfWeek} {slot.startTime}–{slot.endTime}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Services */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tech.services.map((service: any) => (
            <Card key={service.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">
                    {service.service_name}
                  </CardTitle>
                  <Badge variant="secondary">
                    {service.category.category_name}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-lg font-semibold">
                  ${Number(service.price)}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                  {service.rating}
                </span>
              </CardContent>
              <div>
                <BookServiceButton
                  serviceId={service.id}
                  serviceName={service.service_name}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Reviews */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Reviews ({tech?.reviews?.length || 0})
        </h2>
        {tech?.reviews?.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {tech?.reviews?.map((review: any) => (
              <Card key={review.id}>
                <CardContent className="pt-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{review.customer.name}</span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      {review.rating}
                    </span>
                  </div>
                  {review.review && (
                    <p className="text-sm text-muted-foreground">
                      {review.review}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
