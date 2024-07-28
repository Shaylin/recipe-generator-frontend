"use client"

import React, { JSX, useState } from "react";
import IngredientsInput from "@/components/ingredientsInput/ingredientsInput";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";
import RecipeDisplay from "@/components/recipeDisplay/recipeDisplay";
import FeedbackPair from "@/components/feedbackPair/feedbackPair";
import { Button } from "@nextui-org/button";
import {Spinner} from "@nextui-org/spinner";
import AttentionCard from "@/components/attentionCard/attentionCard";
import Disclaimer from "@/components/disclaimer/disclaimer";

export default function RecipeGenerator(): JSX.Element {
  const [recipe, setRecipe] = useState<GeneratedRecipeResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<string>("");
  
  const fetchData = () => {
    setIsGenerating(true);
    
    fetch("/api/generate", { method: "POST", body: JSON.stringify({ ingredients: ingredients.split(",") }) })
      .then(response => response.json())
      .then(data => setRecipe(data))
      .finally(() => setIsGenerating(false));
  };
  
  return (
    <div
      className="flex flex-col items-center max-w-screen-lg sm:w-10/12 w-11/12 bg-light-tone p-6 rounded-xl shadow gap-8">
      
      <AttentionCard/>
      
      <div className="flex flex-row flex-wrap gap-4 w-full justify-center">
        <IngredientsInput onUpdate={(ingredientsList: string) => setIngredients(ingredientsList)}/>
        <Button onClick={fetchData}
          className={`btn btn-neutral w-32 ${isGenerating ? "animate-pulse pointer-events-none" : null}`}>{isGenerating ? "Generating..." : "Generate!"}</Button>
      </div>
      
      {isGenerating && <Spinner className="text-light-tone" color="warning" size="lg"/>}
      
      {(recipe?.success && !isGenerating) && <RecipeDisplay recipe={recipe}/>}
      
      {(recipe?.success && !isGenerating) && <FeedbackPair response={recipe!}/>}
      
      {(recipe?.success && !isGenerating) && <Disclaimer/>}
    </div>
  )
}