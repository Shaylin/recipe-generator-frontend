"use client"

import React, { JSX, useState } from "react";
import { Button } from "@headlessui/react";
import IngredientsInput from "@/components/ingredientsInput/ingredientsInput";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";

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
    <div className="flex flex-col items-center max-w-screen-lg bg-light-tone p-6 rounded-md shadow gap-8">
      <h1>DUT Diabetic-Friendly Recipe Generator</h1>
      
      <div className="flex flex-row gap-8">
        <IngredientsInput onUpdate={(ingredientsList: string) => setIngredients(ingredientsList)}/>
        <Button onClick={fetchData} className="btn btn-primary">Generate !</Button>
      </div>
      
      {isGenerating && <span className="loading loading-spinner text-accent"></span>}
      
      {recipe?.success && <div>{JSON.stringify(recipe)}</div>}
    </div>
  )
}