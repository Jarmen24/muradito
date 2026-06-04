"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, Plus, Minus } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";

// 👇 moved outside the component
const Counter = ({
  label,
  value,
  onIncrease,
  onDecrease,
  min = 0,
}: {
  label: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
}) => (
  <div className="flex items-center justify-between py-3 px-4">
    <span className="text-sm text-slate-600">{label}</span>
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-full"
        onClick={onDecrease}
        disabled={value <= min}
      >
        <Minus size={12} />
      </Button>
      <span className="text-sm w-4 text-center">{value}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 rounded-full"
        onClick={onIncrease}
      >
        <Plus size={12} />
      </Button>
    </div>
  </div>
);

export function DropdownMenuWho({ className }: { className?: string }) {
  const { adults, setAdults, children, setChildren } = useSearchStore();
  const total = adults + children;
  const label = total === 1 ? "1 guest" : `${total} guests`;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-full flex justify-between items-center rounded-lg border-0 bg-white py-6 ${className} `}
        >
          <span className="text-md text-slate-600">{label}</span>
          <Users size={18} stroke="#c7c7c7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-lg py-2"
        align="start"
        style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
      >
        <Counter
          label="Adults"
          value={adults}
          min={1}
          onIncrease={() => setAdults(adults + 1)}
          onDecrease={() => setAdults(adults - 1)}
        />
        <Counter
          label="Children"
          value={children}
          onIncrease={() => setChildren(children + 1)}
          onDecrease={() => setChildren(Math.max(0, children - 1))}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
