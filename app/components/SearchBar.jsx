"use client"; // ✅ Must be the first line

import { SearchIcon } from "lucide-react";

const SearchBar = ({ search, handleInput, handleSubmit }) => {
  return (
    <div className="flex justify-between py-2 px-6 border-2">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
          <SearchIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Enter Dish"
            value={search}
            onChange={handleInput}
            className="pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          />
          <button
            type="submit"
            aria-label="Search"
            className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
