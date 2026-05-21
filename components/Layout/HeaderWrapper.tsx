"use client"
import { useHeaderStore } from '@/store/useHeaderStore';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const { isTransparent, isScrolling, setIsTransparent, setIsScrolling } = useHeaderStore();
  const transparent = Boolean(pathname === "/listing");
    console.log(transparent);
  useEffect(() => {
    setIsTransparent(transparent);
  }, [transparent]);

  return (
    <>
    <header className={`flex items-center w-full px-6 py-2 absolute z-30  ${isTransparent ? "" : "bg-white/80 backdrop-blur-md shadow-sm ring-1 ring-foreground/10 sticky top-0 rounded-xl"}`}>
        {children}
    </header>
    </>
  )
}

export default HeaderWrapper