import Card from "@/components/Listing/Card";
import GridContainer from "@/components/Listing/GridContainer";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Listing } from "@prisma/client";
import { getFirstFive } from "@/app/lib/listing";
import Link from "next/link";
import { DropdownMenu } from "radix-ui";
import { DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { DropdownMenuWhere } from "@/components/Layout/DropdownWhere";

const AllListing = async () => {
  const listings: Listing[] = await getFirstFive();
  if (!listings.length) return <div>No listings found</div>;
  return (
    <div className="flex flex-col min-h-screen  gap-6">
      <div className="w-full h-140 relative">
        <Image
          src="/bg-listing.jpg"
          className="object-cover w-full rounded-xl object-[center_35%]"
          fill
          alt="background"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white space-y-4 px-4">
            <h1 className="text-5xl font-bold">
              Find the perfect place for you
            </h1>

            <p className="text-lg text-gray-200 max-w-2xl">
              Discover apartments, condos, and homes that match your lifestyle.
            </p>

            <div className="bg-neutral-100 rounded-xl p-4 grid grid-cols-10 gap-3 min-w-4xl mx-auto">
              <div className="col-span-3 grid gap-2">
                <Label className=" text-black">Where</Label>
                <DropdownMenuWhere />
              </div>
              <div className="col-span-3 grid gap-2">
                <Label className=" text-black">When</Label>
                <DropdownMenuWhere />
              </div>
              <div className="col-span-3 grid gap-2">
                <Label className=" text-black">Who</Label>
                <DropdownMenuWhere />
              </div>
              <button className="bg-black text-white px-6 py-2 rounded-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto space-y-6">
        <GridContainer>
          {listings.map((listing) => (
            <Link key={listing.id} href={`/listings/${listing.id}`}>
              <Card
                key={listing.id}
                src={listing.images[0]}
                title={listing.name}
                price={`$${listing.price}`}
              />
            </Link>
          ))}
        </GridContainer>
      </div>
    </div>
  );
};

export default AllListing;
