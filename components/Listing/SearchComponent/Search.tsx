import React from "react";
import { Label } from "../../ui/label";
import { DropdownMenuWhere } from "./DropdownWhere";
import { getAllCities } from "@/app/lib/city";
import { DropdownMenuWhen } from "./DropdownWhen";
import { DropdownMenuWho } from "./DropdownWho";

const Search = async () => {
  const cities = await getAllCities();
  return (
    <div className="bg-neutral-100 rounded-xl p-4 grid grid-cols-10 gap-3 min-w-4xl mx-auto">
      <div className="col-span-3 grid gap-2">
        <Label className=" text-black">Where</Label>
        <DropdownMenuWhere cities={cities} />
      </div>
      <div className="col-span-3 grid gap-2">
        <Label className=" text-black">When</Label>
        <DropdownMenuWhen />
      </div>
      <div className="col-span-3 grid gap-2">
        <Label className=" text-black">Who</Label>
        <DropdownMenuWho />
      </div>
      <div className="col-span-1 grid gap-2">
        <Label className=" text-black"></Label>
        <button className="bg-black text-white px-6 py-2 rounded-lg">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
