import Image from "next/image";
import { Listing } from "@prisma/client";
import { getFirstTenListing } from "@/app/lib/listing";
import { Label } from "@/components/ui/label";
import { DropdownMenuWhere } from "@/components/Listing/SearchComponent/DropdownWhere";
import ListingCarousel from "@/components/Listing/ListingCarousel";
import Search from "@/components/Listing/SearchComponent/Search";

const AllListing = async () => {
  const listingsRaw: Listing[] = await getFirstTenListing();

  const listings = JSON.parse(JSON.stringify(listingsRaw));
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
            <Search />
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-lg font-semibold">Popular Rentals</h2>
        <ListingCarousel listings={listings} />
      </div>
    </div>
  );
};

export default AllListing;
