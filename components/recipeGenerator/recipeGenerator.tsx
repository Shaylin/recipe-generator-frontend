"use client"

import React, { JSX, useState } from "react";
import IngredientsInput from "@/components/ingredientsInput/ingredientsInput";

export default function RecipeGenerator(): JSX.Element {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState("");
  
  const fetchData = () => {
    fetch("/api/generate", { method: "POST", body: "somehow need to get the input contents?" })
      .then(response => response.json())
      .then(data => setRecipe(data));
  };
  
  return (
    <div className="flex flex-col max-w-screen-lg bg-light-tone p-6 rounded-md shadow gap-8">
      <h1>DUT Diabetic-Friendly Recipe Generator</h1>
      
      <div className="flex flex-row gap-8">
        <IngredientsInput onUpdate={() => {
          setIngredients("babble");
          return;
        }}/>
        <button onClick={fetchData}>Generate!</button>
      </div>
      
      <div>{recipe ? JSON.stringify(recipe) : "Loading..."}</div>
    </div>
  )
}