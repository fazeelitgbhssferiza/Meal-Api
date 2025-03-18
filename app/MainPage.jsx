"use client"; // ✅ Must be the first line

import { useState } from "react";
import MealCard from "./components/MealCard"; // Adjusted import path
import SearchBar from "./components/SearchBar"; // Adjusted import path

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
      
      <SearchBar 
        search={search} 
        handleInput={handleInput} 
        handleSubmit={handleSubmit} 
      />

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
