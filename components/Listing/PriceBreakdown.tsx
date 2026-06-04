"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListingWithCityWithDetails } from "@/app/types/listing";
import { StarIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { DropdownMenuWhen } from "./SearchComponent/DropdownWhen";
import { Label } from "../ui/label";
import { DropdownMenuWho } from "./SearchComponent/DropdownWho";
const PriceBreakdown = ({
  listing,
  price,
}: {
  listing: ListingWithCityWithDetails;
  price: string;
}) => {
  return (
    <Card className="h-fit lg:sticky lg:top-24">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{listing.propertyType}</Badge>
          <Badge variant="outline">{listing.listingType}</Badge>
        </div>
        <CardTitle className="text-lg">Book your stay</CardTitle>
        <CardDescription>Best price · free cancellation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-3xl font-semibold">{price}</p>
          <p className="text-sm text-muted-foreground">per night</p>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className="size-4 text-yellow-500"
              fill={i < 4 ? "currentColor" : "none"}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            Guest favorite
          </span>
        </div>

        <Separator />
        <Label className="mb-2">Check in - Check out</Label>
        <DropdownMenuWhen className="border-1 border-gray-200" />
        <Label className="mb-2">Guests</Label>

        <DropdownMenuWho className="border-1 border-gray-200" />

        <Button className="w-full rounded-4xl" size="lg">
          Book now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PriceBreakdown;
