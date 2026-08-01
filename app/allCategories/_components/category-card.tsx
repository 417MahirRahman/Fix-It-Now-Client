import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  description?: string;
}

export function CategoryCard({ name, description }: CategoryCardProps) {
  return (
    <Link href={`/services?type=${encodeURIComponent(name)}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="p-5 space-y-1.5">
          <h3 className="font-semibold">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
