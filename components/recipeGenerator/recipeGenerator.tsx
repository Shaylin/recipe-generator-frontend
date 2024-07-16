"use client"

import React, { JSX, useState } from "react";
import { Button } from "@headlessui/react";
import IngredientsInput from "@/components/ingredientsInput/ingredientsInput";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";
import RecipeDisplay from "@/components/recipeDisplay/recipeDisplay";

export default function RecipeGenerator(): JSX.Element {
  const [recipe, setRecipe] = useState<GeneratedRecipeResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<string>("");
  
  const fetchData = () => {
    setIsGenerating(true);
    
    fetch("/api/generate", { method: "POST", body: JSON.stringify({ ingredients: ingredients }) })
      .then(response => response.json())
      .then(data => setRecipe(data))
      .finally(() => setIsGenerating(false));
  };
  
  return (
    <div
      className="flex flex-col items-center max-w-screen-lg sm:w-10/12 w-11/12 min-h-64 bg-light-tone p-6 rounded-md shadow gap-8">
      <h1>DUT Diabetic-Friendly Recipe Generator</h1>
      
      <div className="flex flex-row gap-4 w-full justify-center">
        <IngredientsInput onUpdate={(ingredientsList: string) => setIngredients(ingredientsList)}/>
        <Button onClick={fetchData}
          className={`btn btn-neutral w-32 ${isGenerating ? "animate-pulse pointer-events-none" : null}`}>{isGenerating ? "Generating..." : "Generate!"}</Button>
      </div>
      
      {isGenerating && <span className="loading loading-spinner text-highlight-tone w-20"></span>}
      
      {recipe?.success && <RecipeDisplay recipe={recipe}/>}
    </div>
  )
}