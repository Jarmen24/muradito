import React from "react";
import { Label } from "../../ui/label";
import { DropdownMenuWhere } from "./DropdownWhere";
import { getAllCities } from "@/app/lib/city";
import { DropdownMenuWhen } from "./DropdownWhen";
import { DropdownMenuWho } from "./DropdownWho";

const Search = async () => {
  const cities = await getAllCities();
  return (
    <div className="bg-neutral-100 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-10 gap-3 max-w-4xl mx-auto">
      <div className="sm:col-span-3 grid gap-2">
        <Label className="text-black">Where</Label>
        <DropdownMenuWhere cities={cities} />
      </div>
      <div className="sm:col-span-3 grid gap-2">
        <Label className="text-black">When</Label>
        <DropdownMenuWhen />
      </div>
      <div className="sm:col-span-3 grid gap-2">
        <Label className="text-black">Who</Label>
        <DropdownMenuWho />
      </div>
      <div className="sm:col-span-1 grid gap-2">
        <Label className="text-black hidden sm:block"></Label>
        <button className="bg-black text-white w-full py-2 lg:px-4 px-2 rounded-lg text-sm">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
