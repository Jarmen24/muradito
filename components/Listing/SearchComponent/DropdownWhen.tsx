"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useSearchStore } from "@/store/useSearchStore";

export function DropdownMenuWhen({ className }: { className?: string }) {
  const { dateRange, setDateRange } = useSearchStore();
  const label = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "MM/dd/yy")} - ${format(dateRange.to, "MM/dd/yy")}`
      : format(dateRange.from, "MM/dd/yy")
    : "Check in - Check out";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-full flex justify-between items-center rounded-lg border-0 bg-white py-6 ${className}`}
        >
          <span className="text-md text-slate-600">{label}</span>
          <CalendarIcon size={18} stroke="#c7c7c7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-lg p-0"
        align="start"
        style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
      >
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={1}
          className="w-full"
          disabled={{ before: new Date() }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
