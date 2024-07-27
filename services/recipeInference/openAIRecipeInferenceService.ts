import RecipeInferenceService from "@/services/recipeInference/recipeInferenceService";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";
import { CompletionResponse, OpenAIClient } from "openai-fetch";
import IngredientsFormattingService from "@/services/ingredientsFormatting/ingredientsFormattingService";
import ServiceRegistry from "@/services/serviceRegistry";

export default class OpenAIRecipeInferenceService implements RecipeInferenceService {
  private readonly client: OpenAIClient;
  private readonly ingredientsFormattingService:IngredientsFormattingService;
  
  public constructor(openAiClientGenerator: (apiKey: string, baseUrl: string) => OpenAIClient) {
    this.client = openAiClientGenerator(process.env["INFERENCE_API_KEY"]!, process.env["INFERENCE_API_URL"]!);
    this.ingredientsFormattingService = ServiceRegistry.getIngredientsFormattingService();
  }
  
  public async generateRecipe(ingredients: string[]): Promise<GeneratedRecipeResponse> {
    
    const prompt = this.ingredientsFormattingService.createdFormattedIngredientsPrompt(ingredients);
    
    const generationResponse = await this.client.createCompletions({
      model: "shaylinc/dut-recipe-generator",
      prompt: prompt,
      temperature: 0.2,
      max_tokens: 1024
    });
    
    return this.tryParseRecipeResponse(prompt, generationResponse);
  }
  
  private tryParseRecipeResponse(prompt: string, generationResponse: CompletionResponse): GeneratedRecipeResponse {
    if (!generationResponse || !generationResponse.choices) {
      return {
        success: false
      };
    }
    
    try {
      const parsedRecipe = JSON.parse(prompt + generationResponse.choices[0].text);
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