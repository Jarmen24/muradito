"use client";

import Link from "next/link";
import { Listing } from "@prisma/client";

import Card from "@/components/Listing/Card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  listings: Listing[];
}

const ListingCarousel = ({ listings }: Props) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {listings.map((listing) => (
          <CarouselItem key={listing.id} className="md:basis-1/2 lg:basis-1/4">
            <Link href={`/listings/${listing.id}`}>
              <Card
                src={listing.images[0]}
                title={listing.name}
                price={`$${listing.price}`}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ListingCarousel;
