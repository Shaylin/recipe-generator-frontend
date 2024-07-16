import { JSX } from "react";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";

export default function RecipeDisplay(props: { recipe: GeneratedRecipeResponse }): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <h1><b><u>{titleCaseString(props.recipe.title!)}</u></b></h1>
      
      <h2><b>Ingredients:</b></h2>
      <ul className="list-disc ml-4">
        {props.recipe.ingredients!.map((ingredient, index) => (
          <li key={index} id={String(index)}>{sentenceCaseText(ingredient)}</li>
        ))}
      </ul>
      
      <h2><b>Method:</b></h2>
      <ul className="list-disc ml-4">
        {props.recipe.method!.map((step, index) => (
          <li key={index} id={String(index)}>{sentenceCaseText(step)}</li>
        ))}
      </ul>
    </div>
  )
}

function titleCaseString(text: string): string {
  return text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function sentenceCaseText(text: string): string {
  return text.split(". ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(". ");
}