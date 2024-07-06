import RecipeInferenceService from "@/services/recipeInference/recipeInferenceService";
import OpenAIRecipeInferenceService from "@/services/recipeInference/openAIRecipeInferenceService";
import OpenAI from "openai";

export default class ServiceRegistry {
  private static recipeInferenceService: RecipeInferenceService;
  
  public static getRecipeInferenceService(): RecipeInferenceService {
    if (this.recipeInferenceService == null) {
      this.recipeInferenceService = new OpenAIRecipeInferenceService((apiKey: string, baseURL: string) => new OpenAI({
        apiKey,
        baseURL
      }));
    }
    
    return this.recipeInferenceService;
  }
}