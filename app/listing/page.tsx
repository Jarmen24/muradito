import Link from "next/link";
import prisma from "@/app/lib/db";
import { Prisma } from "@prisma/client";

type ListingPageProps = {
  searchParams: Promise<{
    q?: string;
    type?: "RENT" | "SALE";
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    sort?: "newest" | "priceAsc" | "priceDesc";
  }>;
};

const parsePositiveNumber = (value?: string) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
};

const toTitleCase = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

const formatPrice = (value: Prisma.Decimal | number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(Number(value));

const getPrimaryImage = (images: string[]) => {
  const validImage = images.find((image) => image.trim().length > 0);
  return validImage ?? "";
};

export default async function AllListingPage({ searchParams }: ListingPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const type = params.type;
  const city = params.city?.trim() ?? "";
  const minPrice = parsePositiveNumber(params.minPrice);
  const maxPrice = parsePositiveNumber(params.maxPrice);
  const bedrooms = parsePositiveNumber(params.bedrooms);
  const sort = params.sort ?? "newest";

  const where: Prisma.ListingWhereInput = {
    AND: [
      query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              { area: { contains: query, mode: "insensitive" } },
            ],
          }
        : {},
      type === "RENT" || type === "SALE" ? { listing_type: type } : {},
      city ? { city: { contains: city, mode: "insensitive" } } : {},
      minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined ? { gte: minPrice } : {}),
              ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
            },
          }
        : {},
      bedrooms !== undefined
        ? { area: { contains: `${bedrooms}`, mode: "insensitive" } }
        : {},
    ],
  };

  const orderBy: Prisma.ListingOrderByWithRelationInput =
    sort === "priceAsc"
      ? { price: "asc" }
      : sort === "priceDesc"
      ? { price: "desc" }
      : { createdAt: "desc" };

  const [listings, totalListings, rentCount, saleCount] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy,
      take: 24,
    }),
    prisma.listing.count({ where }),
    prisma.listing.count({ where: { listing_type: "RENT" } }),
    prisma.listing.count({ where: { listing_type: "SALE" } }),
  ]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-100 px-4 py-6 md:px-8 md:py-10">
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-300/30 backdrop-blur md:p-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
                Muradito Homes
              </p>
              <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
                Search beautiful homes to rent or buy in minutes
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-zinc-600 md:text-base">
                Browse curated property listings with fast filters, clear pricing,
                and rich previews that help users decide quicker.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 self-stretch lg:min-w-[380px]">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-xs text-zinc-500">Matches</p>
                <p className="mt-1 text-2xl font-semibold text-zinc-900">{totalListings}</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-xs text-zinc-500">Rent</p>
                <p className="mt-1 text-2xl font-semibold text-zinc-900">{rentCount}</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-xs text-zinc-500">Sale</p>
                <p className="mt-1 text-2xl font-semibold text-zinc-900">{saleCount}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-zinc-200/70 bg-white p-5 shadow-lg shadow-slate-200/60 md:p-6">
          <form className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by name, area, or details"
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none ring-0 transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
            />

            <select
              name="type"
              defaultValue={type ?? ""}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white"
            >
              <option value="">All listing types</option>
              <option value="RENT">For rent</option>
              <option value="SALE">For sale</option>
            </select>

            <input
              type="text"
              name="city"
              defaultValue={city}
              placeholder="City"
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
            />

            <select
              name="sort"
              defaultValue={sort}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white"
            >
              <option value="newest">Newest first</option>
              <option value="priceAsc">Price: low to high</option>
              <option value="priceDesc">Price: high to low</option>
            </select>

            <input
              type="number"
              name="minPrice"
              defaultValue={params.minPrice ?? ""}
              min={0}
              placeholder="Min price"
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
            />

            <input
              type="number"
              name="maxPrice"
              defaultValue={params.maxPrice ?? ""}
              min={0}
              placeholder="Max price"
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
            />

            <input
              type="number"
              name="bedrooms"
              defaultValue={params.bedrooms ?? ""}
              min={0}
              placeholder="Bedrooms (keyword)"
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white"
            />

            <div className="flex gap-2">
              <button className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
                Apply filters
              </button>
              <Link
                href="/listing"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-center text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                Reset
              </Link>
            </div>
          </form>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {listings.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-zinc-300 bg-white p-12 text-center shadow-sm">
              <p className="text-xl font-medium text-zinc-800">
                No properties match your filters
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Try broadening your search or changing listing type.
              </p>
            </div>
          ) : (
            listings.map((listing) => (
              <Link
                href={`/listing/${listing.url}`}
                key={listing.id}
                className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
              >
                <div className="relative h-52 w-full overflow-hidden bg-zinc-100">
                  {getPrimaryImage(listing.images) ? (
                    <img
                      src={getPrimaryImage(listing.images)}
                      alt={listing.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-100 text-sm text-zinc-500">
                      No image available
                    </div>
                  )}
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur">
                    {toTitleCase(listing.listing_type)}
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        {listing.city}, {listing.country}
                      </p>
                      <h2 className="mt-1 line-clamp-1 text-xl font-semibold text-zinc-900">
                        {listing.name}
                      </h2>
                    </div>
                    <p className="text-right text-xs text-zinc-500">
                      {listing.images.length} photos
                    </p>
                  </div>
                  <p className="line-clamp-2 text-sm text-zinc-600">
                    {listing.description || "No additional description provided."}
                  </p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-zinc-950">
                      {formatPrice(listing.price, listing.price_currency)}
                    </p>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                      {listing.area}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
