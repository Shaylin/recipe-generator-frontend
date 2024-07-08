"use client"

import React, { JSX, useState } from "react";
import IngredientsInput from "@/components/ingredientsInput/ingredientsInput";

export default function RecipeGenerator(): JSX.Element {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState<string>("");
  
  const fetchData = () => {
    fetch("/api/generate", { method: "POST", body: JSON.stringify({ ingredients: ingredients }) })
      .then(response => response.json())
      .then(data => setRecipe(data));
  };
  
  return (
    <div className="flex flex-col max-w-screen-lg bg-light-tone p-6 rounded-md shadow gap-8">
      <h1>DUT Diabetic-Friendly Recipe Generator</h1>
      
      <div className="flex flex-row gap-8">
        <IngredientsInput onUpdate={(ingredientsList: string) => setIngredients(ingredientsList)}/>
        <button onClick={fetchData}>Generate!</button>
      </div>
      
      <div>{recipe ? JSON.stringify(recipe) : "Loading..."}</div>
      
      <div>
        Ingredio: {ingredients}
      </div>
    </div>
  )
}