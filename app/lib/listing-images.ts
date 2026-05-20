/** Primary gallery slots on the listing detail page (mosaic layout). */
export const LISTING_GALLERY_SLOT_COUNT = 5;

export const LISTING_IMAGE_PLACEHOLDER = "/bg-listing.jpg";

export type ListingGallerySlot = {
  index: number;
  src: string | null;
  isPlaceholder: boolean;
};

export function buildListingGallerySlots(
  images: string[],
  slotCount = LISTING_GALLERY_SLOT_COUNT,
): {
  slots: ListingGallerySlot[];
  totalCount: number;
  extraCount: number;
} {
  const cleaned = images.filter(Boolean);
  const totalCount = cleaned.length;
  const extraCount = Math.max(0, totalCount - slotCount);

  const slots: ListingGallerySlot[] = Array.from(
    { length: slotCount },
    (_, index) => {
      const src = cleaned[index] ?? null;
      return {
        index,
        src,
        isPlaceholder: src === null,
      };
    },
  );

  return { slots, totalCount, extraCount };
}
