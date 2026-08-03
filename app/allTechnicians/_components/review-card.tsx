/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ReviewCard = ({ review }: { review: any }) => {
  return (
    <div>
      <Card
        key={review.id}
        className="group relative overflow-hidden transition-all duration-300 hover:shadow-md border-border/50"
      >
        <CardContent className="pt-5 pb-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 ring-2 ring-border">
                <AvatarFallback className="text-sm font-semibold bg-muted">
                  {review.customer.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm leading-tight">
                  {review.customer.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {review.review && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {review.review}
            </p>
          )}
        </CardContent>

        {/* Ring overlay for depth */}
        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
      </Card>
    </div>
  );
}

export default ReviewCard