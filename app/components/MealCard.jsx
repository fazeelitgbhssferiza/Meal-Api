import React, { useState } from "react";
import MealInfo from "./MealInfo";

const MealCard = ({ meals = [], search }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);

  if (meals.length === 0) {
    return (
      <div className="p-6 text-xl text-center font-bold text-gray-500">
        No meals found. Try another search.
      </div>
    );
  }

  return (
    <div>
      {selectedMeal ? (
        <MealInfo idMeal={selectedMeal} onBack={() => setSelectedMeal(null)} />
      ) : (
        <>
          <p className="text-lg font-bold mt-2">Category: {search}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {meals.map((meal) => (
              <div key={meal.idMeal} className="border rounded-lg p-4 shadow-md">
                <img
                  src={meal.strMealThumb || "/placeholder.svg"}
                  alt={meal.strMeal || "Meal image"}
                  className="w-full h-48 object-cover rounded-lg"
                  loading="lazy"
                />
                <h3 className="text-lg font-bold mt-2">{meal.strMeal}</h3>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  onClick={() => {
                    console.log("Meal Selected:", meal.idMeal); // Debugging log
                    setSelectedMeal(meal.idMeal);
                  }}
                >
                  View Recipe
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MealCard;
