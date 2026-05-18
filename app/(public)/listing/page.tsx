import Image from "next/image";
import { getFirstTenListing } from "@/app/lib/listing";
import { Label } from "@/components/ui/label";
import { DropdownMenuWhere } from "@/components/Listing/SearchComponent/DropdownWhere";
import ListingCarousel from "@/components/Listing/ListingCarousel";
import Search from "@/components/Listing/SearchComponent/Search";
import { ListingWithCity } from "@/app/types/listing";

const AllListing = async () => {
  const listingsRaw: ListingWithCity[] = await getFirstTenListing();
  const listingsManila: ListingWithCity[] = await getFirstTenListing("Manila");

  const listings = JSON.parse(JSON.stringify(listingsRaw));
  const listingsManilaClean = JSON.parse(JSON.stringify(listingsManila));

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

            <p className="text-lg text-gray-200 w-full">
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
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-lg font-semibold">Stay in Manila</h2>
        <ListingCarousel listings={listingsManilaClean} />
      </div>
    </div>
  );
};

export default AllListing;
