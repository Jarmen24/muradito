import { create } from "zustand";
import { DateRange } from "react-day-picker";

type City = {
  id: string;
  name: string;
  icon: string;
};

type SearchStore = {
  city: City | null;
  dateRange: DateRange | undefined;
  adults: number;
  children: number;

  setCity: (city: City) => void;
  setDateRange: (range: DateRange | undefined) => void;
  setAdults: (n: number) => void;
  setChildren: (n: number) => void;
  reset: () => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  city: null,
  dateRange: undefined,
  adults: 1,
  children: 0,

  setCity: (city) => set({ city }),
  setDateRange: (dateRange) => set({ dateRange }),
  setAdults: (adults) => set({ adults }),
  setChildren: (children) => set({ children }),
  reset: () =>
    set({ city: null, dateRange: undefined, adults: 1, children: 0 }),
}));
