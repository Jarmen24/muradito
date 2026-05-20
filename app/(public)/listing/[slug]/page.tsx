import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPinIcon, StarIcon } from "lucide-react";

import { getListingBySlug } from "@/app/lib/listing";
import ListingImageGallery from "@/components/Listing/ListingImageGallery";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

  if (!listing) {
    notFound();
  }

  const price = formatPrice(listing.price, listing.price_currency);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-24 md:px-6">
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
              <dd className="font-medium">{listing.property_type}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Listing type</dt>
              <dd className="font-medium">{listing.listing_type}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Area</dt>
              <dd className="font-medium">{listing.area}</dd>
            </div>
          </dl>
        </div>

        <Card className="h-fit lg:sticky lg:top-24">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{listing.property_type}</Badge>
              <Badge variant="outline">{listing.listing_type}</Badge>
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

            <Button className="w-full rounded-4xl" size="lg">
              Book now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
