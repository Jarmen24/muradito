import Image from "next/image";
import { ImageIcon } from "lucide-react";

import {
  buildListingGallerySlots,
  LISTING_IMAGE_PLACEHOLDER,
} from "@/app/lib/listing-images";
import { cn } from "@/lib/utils";

function GallerySlot({
  src,
  alt,
  isPlaceholder,
  priority,
  sizes,
  overlay,
  className,
}: {
  src: string | null;
  alt: string;
  isPlaceholder: boolean;
  priority?: boolean;
  sizes: string;
  overlay?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full min-h-[120px] w-full overflow-hidden rounded-xl ring-1 ring-foreground/10",
        isPlaceholder && "bg-muted",
        className,
      )}
    >
      {isPlaceholder ? (
        <div className="flex h-full min-h-[inherit] flex-col items-center justify-center gap-2 p-4 text-muted-foreground">
          <ImageIcon className="size-8 opacity-40" aria-hidden />
          <span className="text-xs font-medium">Photo coming soon</span>
        </div>
      ) : (
        <Image
          src={src!}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
          unoptimized
        />
      )}
      {overlay ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/45">
          <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
            {overlay}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default function ListingImageGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const normalized =
    images.length > 0 ? images : [LISTING_IMAGE_PLACEHOLDER];
  const { slots, totalCount, extraCount } =
    buildListingGallerySlots(normalized);

  return (
    <section className="space-y-2" aria-label={`${name} photos`}>
      <div className="grid h-auto grid-cols-2 gap-2 md:h-[min(440px,52vh)] md:grid-cols-4 md:grid-rows-2">
        <div className="relative col-span-2 row-span-2 min-h-[220px] md:min-h-0">
          <GallerySlot
            src={slots[0].src}
            alt={`${name} — photo 1`}
            isPlaceholder={slots[0].isPlaceholder}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-2xl md:rounded-xl"
          />
        </div>

        {slots.slice(1).map((slot) => {
          const photoNumber = slot.index + 1;
          const showMoreOverlay =
            slot.index === 4 && extraCount > 0 && !slot.isPlaceholder;

          return (
            <div
              key={slot.index}
              className="relative min-h-[100px] md:min-h-0"
            >
              <GallerySlot
                src={slot.src}
                alt={`${name} — photo ${photoNumber}`}
                isPlaceholder={slot.isPlaceholder}
                sizes="(max-width: 768px) 25vw, 200px"
                overlay={
                  showMoreOverlay ? `+${extraCount} more` : undefined
                }
              />
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        {totalCount === 0
          ? "No photos uploaded yet"
          : totalCount === 1
            ? "1 photo · 4 more slots available"
            : totalCount <= 5
              ? `${totalCount} of 5 gallery slots filled`
              : `Showing 5 of ${totalCount} photos`}
      </p>
    </section>
  );
}
