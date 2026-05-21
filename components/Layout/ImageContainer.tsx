"use client";

import { useHeaderStore } from "@/store/useHeaderStore";
import Image from "next/image";
import React from "react";

const ImageContainer = () => {
  const { isTransparent } = useHeaderStore();
  return (
    <>
      <Image
        src={isTransparent ? "/bookit-white.png" : "/bookit-black.png"}
        width={90}
        height={40}
        alt="logo"
      />
    </>
  );
};

export default ImageContainer;
