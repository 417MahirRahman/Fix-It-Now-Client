/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Star,
  MapPin,
  Briefcase,
  Clock,
  MessageSquare,
  Wrench,
  ArrowLeft,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BookServiceButton } from "../_components/book-service-button";
import NotFound from "@/app/not-found";
import ReviewCard from "../_components/review-card";
import Link from "next/link";

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
  const result = await res.json();
  const tech = result.data;

  if (!tech) {
    NotFound();
  }

  const reviews = tech.reviews ?? [];
  const services = tech.services ?? [];
  const availability = tech.availability ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Back button */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/allTechnicians">
            <ArrowLeft className="size-4" />
            Back to Technicians
          </Link>
        </Button>

        {/* ---- Header: photo, name, rating, experience, address ---- */}
        <Card className="relative overflow-hidden border-border/50 shadow-sm">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

          <CardContent className="pt-10 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="size-24 ring-4 ring-primary/20 shadow-lg">
                <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                  {tech.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center sm:text-left space-y-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    {tech.user.name}
                  </h1>
                  {tech.bio && (
                    <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
                      {tech.bio}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <div className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">
                      {tech.avgRating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({reviews.length} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5">
                    <Briefcase className="size-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">
                      {tech.experienceYears}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      yrs experience
                    </span>
                  </div>

                  {tech.user.address && (
                    <div className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5">
                      <MapPin className="size-4 text-muted-foreground" />
                      <span className="text-sm">{tech.user.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ---- Availability ---- */}
        {availability.length > 0 && (
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Availability</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    When this technician is available for bookings
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {availability.map((slot: any) => (
                  <Badge
                    key={slot.id}
                    variant="outline"
                    className="gap-1.5 px-3 py-1.5 font-medium"
                  >
                    <Clock className="size-3.5" />
                    {slot.dayOfWeek} {slot.startTime}–{slot.endTime}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ---- Services ---- */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Wrench className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Services</h2>
              <p className="text-xs text-muted-foreground">
                {services.length} service{services.length !== 1 ? "s" : ""}{" "}
                offered
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service: any) => (
              <Card
                key={service.id}
                className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="flex flex-row items-start gap-3 pb-3 pt-5 px-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <Wrench className="size-5 text-primary/70 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {service.service_name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="mt-2 text-[10px] font-medium px-1.5 py-0"
                    >
                      {service.category.category_name}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 justify-between gap-3 text-sm px-4 pb-4 pt-0">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                        Price
                      </p>
                      <span className="text-xl font-bold tracking-tight text-foreground">
                        ${Number(service.price).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-yellow-50 dark:bg-yellow-400/10 px-2 py-0.5 border border-yellow-200/50 dark:border-yellow-400/20">
                      <Star className="size-3 fill-yellow-400 text-yellow-500" />
                      <span className="text-xs font-bold text-foreground">
                        {service.rating}
                      </span>
                    </div>
                  </div>

                  <BookServiceButton
                    serviceId={service.id}
                    serviceName={service.service_name}
                  />
                </CardContent>

                {/* Ring overlay for depth */}
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
              </Card>
            ))}
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* ---- Reviews ---- */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageSquare className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Reviews</h2>
              <p className="text-xs text-muted-foreground">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""} from
                customers
              </p>
            </div>
          </div>

          {reviews.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="pt-6 pb-6 text-center">
                <MessageSquare className="size-12 mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground">No reviews yet.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Be the first to book and leave a review!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((review: any) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
