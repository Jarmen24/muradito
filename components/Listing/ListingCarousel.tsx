"use client";

import Link from "next/link";
import Card from "@/components/Listing/Card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ListingWithCity } from "@/app/types/listing";

interface Props {
  listings: ListingWithCity[];
}

const ListingCarousel = ({ listings }: Props) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {listings.map((listing) => (
          <CarouselItem key={listing.id} className="md:basis-1/4 lg:basis-1/6 ">
            <Link href={`/listings/${listing.id}`}>
              <Card
                src={listing.images[0]}
                title={listing.name}
                city={listing.city.name}
                price={`$${listing.price}`}
                area={listing.area}
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
