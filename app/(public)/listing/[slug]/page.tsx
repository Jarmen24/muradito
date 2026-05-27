import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPinIcon, StarIcon } from "lucide-react";
import {
  Users,
  BedDouble,
  Bath,
  Bed,
  Wifi,
  AirVent,
  Waves,
  Dumbbell,
  Car,
  LandPlot,
  Sparkles,
} from "lucide-react";

import { getListingBySlug } from "@/app/lib/listing";
import ListingImageGallery from "@/components/Listing/ListingImageGallery";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PriceBreakdown from "@/components/Listing/PriceBreakdown";

function formatPrice(amount: unknown, currency: string) {
  const value = typeof amount === "number" ? amount : Number(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  console.log(listing);
  if (!listing) {
    notFound();
  }

  const price = formatPrice(listing.price, listing.priceCurrency);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 md:px-6">
      <Button variant="link" className="mb-4 px-0" asChild>
        <Link href="/listing">← Back to listings</Link>
      </Button>

      <ListingImageGallery images={listing.images} name={listing.name} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">
              {listing.name}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
              <MapPinIcon className="size-4 shrink-0" />
              {listing.city.name} · {listing.area}, {listing.country}
            </p>
          </div>
          {listing.description ? (
            <div>
              <h2 className="text-lg font-semibold">About this place</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {listing.description}
              </p>
            </div>
          ) : null}
          <dl className="grid gap-3 rounded-2xl bg-muted/40 p-4 text-sm ring-1 ring-foreground/10">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Property type</dt>
              <dd className="font-medium">{listing.propertyType}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Listing type</dt>
              <dd className="font-medium">{listing.listingType}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Area</dt>
              <dd className="font-medium">{listing.area}</dd>
            </div>
          </dl>
          {listing.listingDetails && (
            <>
              <Separator />

              <div>
                <h2 className="text-lg font-semibold">Space details</h2>
                <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      label: "Guests",
                      value: listing.listingDetails.guests,
                      icon: Users,
                    },
                    {
                      label: "Bedrooms",
                      value: listing.listingDetails.bedrooms,
                      icon: BedDouble,
                    },
                    {
                      label: "Beds",
                      value: listing.listingDetails.beds,
                      icon: Bed,
                    },
                    {
                      label: "Baths",
                      value: listing.listingDetails.baths,
                      icon: Bath,
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2 rounded-2xl bg-muted/40 p-4 text-center ring-1 ring-foreground/10"
                    >
                      <Icon className="size-5 text-muted-foreground" />
                      <dd className="text-xl font-semibold">{value}</dd>
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Amenities</h2>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                  {[
                    {
                      label: "WiFi",
                      value: listing.listingDetails.wifi,
                      icon: Wifi,
                    },
                    {
                      label: "Air Conditioning",
                      value: listing.listingDetails.airConditioned,
                      icon: AirVent,
                    },
                    {
                      label: "Swimming Pool",
                      value: listing.listingDetails.swimmingPool,
                      icon: Waves,
                    },
                    {
                      label: "Gym",
                      value: listing.listingDetails.gym,
                      icon: Dumbbell,
                    },
                    {
                      label: "Parking",
                      value: listing.listingDetails.parking,
                      icon: Car,
                    },
                    {
                      label: "Golf",
                      value: listing.listingDetails.golf,
                      icon: LandPlot,
                    },
                    {
                      label: "Spa",
                      value: listing.listingDetails.spa,
                      icon: Sparkles,
                    },
                  ]
                    .filter((a) => a.value === 1)
                    .map(({ label, icon: Icon }) => (
                      <li
                        key={label}
                        className="flex items-center gap-3 rounded-xl bg-muted/40 px-4 py-3 ring-1 ring-foreground/10"
                      >
                        <Icon className="size-4 shrink-0 text-green-500" />
                        <span>{label}</span>
                      </li>
                    ))}
                </ul>

                {listing.listingDetails.others && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    + {listing.listingDetails.others}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        <PriceBreakdown listing={listing} price={price} />
      </div>
    </div>
  );
}
