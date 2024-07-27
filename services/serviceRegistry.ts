import RecipeInferenceService from "@/services/recipeInference/recipeInferenceService";
import OpenAIRecipeInferenceService from "@/services/recipeInference/openAIRecipeInferenceService";
import { OpenAIClient } from "openai-fetch";
import IngredientsFormattingService from "@/services/ingredientsFormatting/ingredientsFormattingService";

export default class ServiceRegistry {
  private static recipeInferenceService: RecipeInferenceService;
  private static ingredientsFormattingService: IngredientsFormattingService;
  
  public static getRecipeInferenceService(): RecipeInferenceService {
    if (this.recipeInferenceService == null) {
      this.recipeInferenceService = new OpenAIRecipeInferenceService((apiKey: string, baseUrl: string) => new OpenAIClient({
        apiKey,
        baseUrl
      }));
    }
    
    return this.recipeInferenceService;
  }
  
  public static getIngredientsFormattingService(): IngredientsFormattingService {
    if (this.ingredientsFormattingService == null) {
      this.ingredientsFormattingService = new IngredientsFormattingService();
    }
    
    return this.ingredientsFormattingService;
  }
}