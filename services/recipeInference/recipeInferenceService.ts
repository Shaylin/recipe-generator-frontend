import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";

export default interface RecipeInferenceService {
  generateRecipe(ingredients: string[]): Promise<GeneratedRecipeResponse>;
}