import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Card = ({
  src,
  title,
  price,
}: {
  src: string;
  title: string;
  price: string;
}) => {
  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white">
      <div className="w-full relative h-32">
        <Image
          src={src}
          className="object-cover w-full rounded-t-xl"
          fill
          alt="logo"
        />
      </div>
      <div className="py-2 px-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold">{title}</h4>
        </div>
        <p className="text-xs text-gray-500">{price} / night</p>
        <span className="flex items-center">
          <StarIcon className="w-3 h-3 text-yellow-500" fill="currentColor" />
          <StarIcon className="w-3 h-3 text-yellow-500" fill="currentColor" />
          <StarIcon className="w-3 h-3 text-yellow-500" fill="currentColor" />
          <StarIcon className="w-3 h-3 text-yellow-500" />
          <StarIcon className="w-3 h-3 text-yellow-500" />
        </span>
      </div>
    </div>
  );
};

export default Card;
