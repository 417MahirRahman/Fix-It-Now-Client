import Link from "next/link";
import { Star, MapPin, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TechnicianCardProps {
  id: string;
  name: string;
  address?: string;
  experienceYears: number;
  avgRating: number;
  categories: string[];
}

export function TechnicianCard({
  id,
  name,
  address,
  experienceYears,
  avgRating,
  categories,
}: TechnicianCardProps) {
  return (
    <Link href={`/technicians/${id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
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
        <CardContent className="space-y-2 text-sm text-muted-foreground">
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
        </CardContent>
      </Card>
    </Link>
  );
}
