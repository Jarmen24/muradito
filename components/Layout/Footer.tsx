import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const exploreLinks = [
  { href: "/listing", label: "Hotel & Homes" },
  { href: "/listing", label: "Browse listings" },
  { href: "/", label: "Real Estate" },
  { href: "/", label: "Articles" },
];

const accountLinks = [
  { href: "/login", label: "Log in" },
  { href: "/signup", label: "Sign up" },
  { href: "/account", label: "My account" },
  { href: "/booking", label: "My bookings" },
];

const legalLinks = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Help" },
];

export default function Footer() {
  return (
    <footer className="w-full rounded-2xl bg-card text-card-foreground ring-1 ring-foreground/10 mt-10">
      <div className="px-6 py-10 md:px-10 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/bookit-white.png"
                width={100}
                height={44}
                alt="Bookit"
                className="invert"
              />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              Find apartments, condos, and homes that match your lifestyle—rent
              or buy across the Philippines.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Account</h3>
            <ul className="mt-4 space-y-2.5">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bookit. All rights reserved.</p>
          <p className="text-xs">Made for finding your next place to stay.</p>
        </div>
      </div>
    </footer>
  );
}
