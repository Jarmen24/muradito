import Card from "@/components/Listing/Card";
import GridContainer from "@/components/Listing/GridContainer";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Listing } from "@prisma/client";
import { getFirstFive } from "@/app/lib/listing";
import Link from "next/link";

const AllListing = async () => {
  const listings: Listing[] = await getFirstFive();
  if (!listings.length) return <div>No listings found</div>;
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <GridContainer>
          {listings.map((listing) => (
            <Link key={listing.id} href={`/listings/${listing.id}`}>
              <Card
                key={listing.id}
                src={listing.images[0]}
                title={listing.name}
                price={`₱${listing.price}`}
              />
            </Link>
          ))}
        </GridContainer>
      </div>
    </div>
  );
};

export default AllListing;
