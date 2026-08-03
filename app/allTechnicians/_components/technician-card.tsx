import Link from "next/link";
import { Star, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechnicianCardProps } from "./technicians.interface";

export function TechnicianCard({ technician }: TechnicianCardProps) {
  const { id, name, address, experienceYears, avgRating, categories } =
    technician;

  return (
    <Card className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 pt-4 px-4">
        <Avatar className="size-12 ring-2 ring-border group-hover:ring-primary/40 transition-all duration-300">
          <AvatarImage src="" alt={name} />
          <AvatarFallback className="text-sm font-semibold bg-muted">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 rounded-full bg-muted/50 px-2 py-0.5 w-fit">
            <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{avgRating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 space-y-2.5 text-sm text-muted-foreground px-4 pb-4 pt-0">
        <div className="space-y-1.5">
          {address && (
            <div className="flex items-start gap-2">
              <MapPin className="size-3.5 shrink-0 mt-0.5 opacity-60" />
              <span className="line-clamp-1 text-xs leading-snug">
                {address}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Briefcase className="size-3.5 shrink-0 opacity-60" />
            <span className="text-xs">
              <span className="font-semibold text-foreground">
                {experienceYears}
              </span>{" "}
              yrs experience
            </span>
          </div>

          <div className="flex flex-wrap gap-1 pt-0.5">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="text-[10px] font-medium px-1.5 py-0"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          asChild
          size="sm"
          className="w-full mt-auto h-9 text-xs font-medium transition-all group-hover:shadow-sm"
        >
          <Link
            href={`/allTechnicians/${id}`}
            className="flex items-center justify-center gap-1.5"
          >
            View Details
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </CardContent>

      {/* Ring overlay for depth */}
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
    </Card>
  );
}
