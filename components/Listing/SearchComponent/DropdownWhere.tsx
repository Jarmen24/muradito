"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as Icons from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";

type City = {
  id: string;
  name: string;
  icon: string;
};

export function DropdownMenuWhere({ cities }: { cities: City[] }) {
  const [search, setSearch] = useState("");
  const { city, setCity } = useSearchStore();

  const filtered = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex justify-between items-center rounded-lg border-0 bg-white py-6"
        >
          <span className="text-md text-slate-600">
            {city ? city.name : "Where are you going?"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c7c7c7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-lg"
        align="start"
        style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
      >
        {/* Search input - stop propagation so typing doesn't close the dropdown */}
        <div className="px-2 py-2">
          <Input
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </div>

        <DropdownMenuGroup className="overflow-y-auto max-h-52">
          {filtered.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">
              No cities found
            </p>
          ) : (
            filtered.map((city) => {
              const Icon = Icons[
                city.icon as keyof typeof Icons
              ] as React.ElementType;
              return (
                <DropdownMenuItem
                  key={city.id}
                  className="py-3 px-4 gap-2 cursor-pointer"
                  onSelect={() => setCity(city)}
                >
                  {Icon && <Icon size={16} />}
                  {city.name}
                </DropdownMenuItem>
              );
            })
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
