/** Slug used in `/listing/[slug]` — first path segment of the Agoda URL. */
export function getListingSlug(url: string): string {
  try {
    const segment = new URL(url).pathname.split("/").filter(Boolean)[0];
    if (segment) return segment;
  } catch {
    // fall through
  }
  return encodeURIComponent(url);
}
