"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface FilterBarProps {
  showLocation?: boolean;
}

export function FilterBar({ showLocation = false }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [rating, setRating] = useState(searchParams.get("rating") ?? "");

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (showLocation && location) params.set("location", location);
    if (rating) params.set("rating", rating);
    router.push(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={applyFilters}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 mb-6"
    >
      <Input
        placeholder="Category (e.g. Plumbing)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="h-10"
      />
      {showLocation && (
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-10"
        />
      )}
      <Input
        type="number"
        min={1}
        max={5}
        placeholder="Min rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="h-10"
      />
      <Button type="submit" className="h-10">
        <Search className="size-4" /> Search
      </Button>
    </form>
  );
}
