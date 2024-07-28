import RecipeInferenceService from "@/services/recipeInference/recipeInferenceService";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";
import IngredientsFormattingService from "@/services/ingredientsFormatting/ingredientsFormattingService";
import ServiceRegistry from "@/services/serviceRegistry";
import CompletionsService from "@/services/completions/completionsService";

export default class OpenAIRecipeInferenceService implements RecipeInferenceService {
  private readonly completionsService: CompletionsService;
  private readonly ingredientsFormattingService: IngredientsFormattingService;
  
  public constructor() {
    this.completionsService = ServiceRegistry.getCompletionsService();
    this.ingredientsFormattingService = ServiceRegistry.getIngredientsFormattingService();
  }
  
  public async generateRecipe(ingredients: string[]): Promise<GeneratedRecipeResponse> {
    
    const prompt = this.ingredientsFormattingService.createdFormattedIngredientsPrompt(ingredients);
    
    const generationResponse = await this.completionsService.generateCompletions({
      apiKey: process.env.INFERENCE_API_KEY!,
      baseUrl: process.env.INFERENCE_API_URL!,
      modelName: "shaylinc/dut-recipe-generator",
      prompt: prompt,
      temperature: 0.2,
      maxTokens: 1024
    });
    
    return this.tryParseRecipeResponse(generationResponse);
  }
  
  private tryParseRecipeResponse(generationResponse: string): GeneratedRecipeResponse {
    if (!generationResponse) {
      return {
        success: false
      };
    }
    
    try {
      const parsedRecipe = JSON.parse(generationResponse);
      return {
        success: true,
        title: parsedRecipe.title,
        ingredients: parsedRecipe.ingredients,
        method: parsedRecipe.method
      };
    } catch (exception) {
      console.error(exception);
      return {
        success: false
      };
    }
  }
}