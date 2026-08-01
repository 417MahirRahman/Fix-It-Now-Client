import Link from "next/link";
import { Star, MapPin, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechnicianCardProps } from "./technicians.interface";

export function TechnicianCard({ technician }: TechnicianCardProps) {
  const { id, name, address, experienceYears, avgRating, categories } =
    technician;

  return (
    <Card className="h-full flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Avatar className="size-12">
          <AvatarImage src="" alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
            {avgRating}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 space-y-3 text-sm text-muted-foreground">
        <div className="space-y-2">
          {address && (
            <p className="flex items-center gap-1.5">
              <MapPin className="size-4" /> {address}
            </p>
          )}
          <p className="flex items-center gap-1.5">
            <Briefcase className="size-4" /> {experienceYears} yrs experience
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {categories.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <Button asChild className="w-full mt-auto">
          <Link href={`/allTechnicians/${id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
