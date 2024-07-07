import RecipeInferenceService from "@/services/recipeInference/recipeInferenceService";
import OpenAIRecipeInferenceService from "@/services/recipeInference/openAIRecipeInferenceService";
import { OpenAIClient } from "openai-fetch";

export default class ServiceRegistry {
  private static recipeInferenceService: RecipeInferenceService;
  
  public static getRecipeInferenceService(): RecipeInferenceService {
    if (this.recipeInferenceService == null) {
      this.recipeInferenceService = new OpenAIRecipeInferenceService((apiKey: string, baseUrl: string) => new OpenAIClient({
        apiKey,
        baseUrl
      }));
    }
    
    return this.recipeInferenceService;
  }
}