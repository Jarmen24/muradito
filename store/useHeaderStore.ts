import { create } from "zustand";

type HeaderStore = {
    isTransparent: boolean;
    isScrolling: boolean;
    setIsScrolling: (isScrolling: boolean) => void;
    setIsTransparent: (isTransparent: boolean) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
    isTransparent: true,
    isScrolling: false,
    setIsTransparent: (isTransparent) => set({ isTransparent }),
    setIsScrolling: (isScrolling) => set({ isScrolling }),
}));