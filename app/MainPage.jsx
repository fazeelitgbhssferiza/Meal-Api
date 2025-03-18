"use client"; // ✅ Must be the first line

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import MealCard from "./components/MealCard"; // Corrected import path

const MainPage = () => {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (event) => {
    setSearch(event.target.value);
    setErrorMessage(""); // Clear error message when typing
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!search.trim()) {
      setMeals([]);
      setErrorMessage("Please Enter Recipe Name.");
      return;
    }

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      const data = await response.json();

      setMeals(data.meals || []);
      setErrorMessage(data.meals ? "" : "No meals found. Try another search.");
    } catch (error) {
      console.error("Error fetching meals:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {/* Search Bar */}
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
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-center text-red-500 font-bold py-4">{errorMessage}</div>
      )}

      {/* Meals List */}
      {!errorMessage && <MealCard meals={meals} search={search} />}
    </div>
  );
};

export default MainPage;
