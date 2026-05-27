import Image from "next/image";
import { getFirstTenListing } from "@/app/lib/listing";
import ListingCarousel from "@/components/Listing/ListingCarousel";
import Search from "@/components/Listing/SearchComponent/Search";
import { ListingWithCity } from "@/app/types/listing";
import { getAllCities } from "@/app/lib/city";
import { prismaListingRepo } from "@/app/lib/prismaRepo/prismaListingRepo";

const AllListing = async ({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    from?: string;
    to?: string;
    adults?: string;
    children?: string;
  }>;
}) => {
  const { city, from, to, adults, children } = await searchParams; // ✅ await it
  const cities = await getAllCities();
  const hasSearch = city && adults;

  const Hero = (
    <div className="w-full h-140 relative">
      <Image
        src="/bg-listing.jpg"
        className="object-cover w-full rounded-xl object-[center_35%]"
        fill
        alt="background"
      />
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center text-white space-y-4 px-4">
          <h1 className="text-5xl font-bold">Find the perfect place for you</h1>
          <p className="text-lg text-gray-200 w-full">
            Discover apartments, condos, and homes that match your lifestyle.
          </p>
          <Search cities={cities} />
        </div>
      </div>
    </div>
  );

  if (hasSearch) {
    console.log(searchParams);
    const listingSearch = await prismaListingRepo.getSearchListing(
      city!,
      {
        from: from ? new Date(from) : undefined,
        to: to ? new Date(to) : undefined,
      },
      Number(adults ?? 1),
      Number(children ?? 0),
    );

    return (
      <div className="flex flex-col min-h-screen">
        {Hero}
        <div className="w-full px-15">
          <div className="w-full mx-auto space-y-6 mt-10">
            <h2 className="text-xl font-semibold">Search Results for {city}</h2>
            {listingSearch && listingSearch.length > 0 ? (
              <ListingCarousel listings={listingSearch} />
            ) : (
              <p className="text-muted-foreground">No listings found.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const listingsRaw: ListingWithCity[] = await getFirstTenListing();
  const listingsManila: ListingWithCity[] = await getFirstTenListing("Manila");
  const listingsPuertoPrincesa: ListingWithCity[] =
    await getFirstTenListing("Puerto Princesa");

  const listings = JSON.parse(JSON.stringify(listingsRaw));
  const listingsManilaClean = JSON.parse(JSON.stringify(listingsManila));
  const listingsPuertoClean = JSON.parse(
    JSON.stringify(listingsPuertoPrincesa),
  );

  if (!listings.length) return <div>No listings found</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {Hero}
      <div className="w-full px-15">
        <div className="w-full mx-auto space-y-6 mt-10">
          <h2 className="text-xl font-semibold">Popular Rentals</h2>
          <ListingCarousel listings={listings} />
        </div>
        <div className="w-full mx-auto space-y-6 mt-10">
          <h2 className="text-xl font-semibold">Stay in Manila</h2>
          <ListingCarousel listings={listingsManilaClean} />
        </div>
        <div className="w-full mx-auto space-y-6 mt-10">
          <h2 className="text-xl font-semibold">Puerto Princesa Goodness</h2>
          <ListingCarousel listings={listingsPuertoClean} />
        </div>
      </div>
    </div>
  );
};

export default AllListing;
