import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Card = ({ src, title, price }: { src: string, title: string, price: string }) => {
  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white">
            <Image
              src={src}
              className="object-cover w-full rounded-t-xl"
              width={200}
              height={300}
              alt="logo"
            />
            <div className="py-2 px-4">
              <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">{title}</h4>
              <span className="flex items-center">
                <StarIcon className="w-4 h-4 text-yellow-500" fill="currentColor"/>
                <StarIcon className="w-4 h-4 text-yellow-500" fill="currentColor"/>
                <StarIcon className="w-4 h-4 text-yellow-500" fill="currentColor"/>
                <StarIcon className="w-4 h-4 text-yellow-500" />
                <StarIcon className="w-4 h-4 text-yellow-500" />

              </span>
              </div>
              <p className="text-xs text-gray-500">
              {price} / night
              </p>
            </div>
          </div>
  )
}

export default Card