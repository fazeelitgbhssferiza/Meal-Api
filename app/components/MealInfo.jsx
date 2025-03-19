"use client";
import { useEffect, useState } from "react";

const MealInfo = ({ idMeal, onBack }) => {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idMeal) return;

    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch meal details.");
        }

        const data = await response.json();
        if (!data.meals) {
          throw new Error("Meal not found.");
        }

        setMeal(data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [idMeal]);

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
        <div className="h-6 bg-gray-200 rounded w-32 mt-6"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-200 rounded w-full mt-2"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p className="text-xl font-bold mb-2">Error</p>
        <p>{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          onClick={onBack}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p className="text-xl font-bold mb-2">No meal found</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          onClick={onBack}
        >
          Go Back
        </button>
      </div>
    );
  }

  const getIngredients = () =>
    Array.from({ length: 20 }, (_, i) => ({
      ingredient: meal[`strIngredient${i + 1}`]?.trim(),
      measure: meal[`strMeasure${i + 1}`]?.trim() || "to taste",
    }))
      .filter(({ ingredient }) => ingredient)
      .map(({ ingredient, measure }) => `${ingredient} - ${measure}`);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{meal.strMeal}</h1>

      <img
        src={meal.strMealThumb || "/placeholder.svg"}
        alt={meal.strMeal || "Meal image"}
        loading="lazy"
        className="w-full h-64 md:h-80 object-cover rounded-lg"
      />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h2 className="text-xl font-bold border-b pb-2">Category</h2>
          <p className="mt-2">{meal.strCategory || "N/A"}</p>

          <h2 className="text-xl font-bold border-b pb-2 mt-6">Origin</h2>
          <p className="mt-2">{meal.strArea || "Unknown"}</p>

          <h2 className="text-xl font-bold border-b pb-2 mt-6">Ingredients</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {getIngredients().map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold border-b pb-2">Instructions</h2>
          <p className="mt-2 whitespace-pre-line">{meal.strInstructions}</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
          onClick={onBack}
          aria-label="Go back to meal list"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MealInfo;
