import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";

export interface GeneratedRecipeFeedback {
  good: boolean;
  response: GeneratedRecipeResponse;
}