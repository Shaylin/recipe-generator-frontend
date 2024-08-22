"use client"

import React, { JSX, useState } from "react";
import IngredientsInput from "@/components/ingredientsInput/ingredientsInput";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";
import RecipeDisplay from "@/components/recipeDisplay/recipeDisplay";
import FeedbackPair from "@/components/feedbackPair/feedbackPair";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import InstructionsCard from "@/components/instructionsCard/instructionsCard";
import { Chip } from "@nextui-org/react";

export default function RecipeGenerator(): JSX.Element {
  const [recipe, setRecipe] = useState<GeneratedRecipeResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  
  const generateRecipe = () => {
    setIsGenerating(true);
    
    console.warn("Starting generation for " + JSON.stringify(ingredients));
    
    fetch("/api/generate", { method: "POST", body: JSON.stringify({ ingredients }) })
      .then(response => response.json())
      .then(data => {
        console.warn("Setting the data " + JSON.stringify(ingredients));
        setRecipe(data)
      })
      .catch((error) => {
        console.error("Failed to parse recipe");
        console.error(JSON.stringify(error));
        console.error(JSON.stringify(recipe));
      })
      .finally(() => {
        console.warn("Ending generation " + JSON.stringify(ingredients));
        setIsGenerating(false)
      });
  };
  
  const successfullyGenerated = recipe?.success;
  
  const removeFromIngredients = (ingredientIndex: number) => {
    setIngredients((existingIngredients: string[]) => {
      return existingIngredients.slice(0, ingredientIndex).concat(existingIngredients.slice(ingredientIndex + 1));
    });
  }
  
  return (
    <div
      className="flex flex-col items-center justify-around max-w-screen-lg min-h-96 sm:w-10/12 w-full bg-light-tone p-6 rounded-xl shadow gap-8">
      
      <InstructionsCard/>
      
      <div className="flex gap-2 w-full flex-wrap justify-center">
        {ingredients.map((ingredient: string, ingredientIndex: number) => {
          return (
            <Chip key={ingredientIndex} size="lg" onClose={() => removeFromIngredients(ingredientIndex)}
              isDisabled={isGenerating}>
              {ingredient}
            </Chip>)
        })}
      </div>
      
      <IngredientsInput isGenerating={isGenerating}
        onIngredientAdded={(ingredient: string) => setIngredients([...ingredients, ingredient])}/>
      
      
      <Button
        onClick={generateRecipe}
        color="primary"
        size="lg"
        className={`btn btn-neutral w-64 ${isGenerating ? "animate-pulse pointer-events-none" : null}`}
      >
        {isGenerating ? "Generating..." : "Generate!"}
      </Button>
      
      
      {isGenerating && <Spinner className="text-light-tone" color="warning" size="lg"/>}
      
      {successfullyGenerated && !isGenerating && <RecipeDisplay recipe={recipe}/>}
      {successfullyGenerated && !isGenerating && <FeedbackPair response={recipe!}/>}
    </div>
  )
}