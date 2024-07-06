import RecipeInferenceService from "@/services/recipeInference/recipeInferenceService";
import OpenAI from "openai";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";
import { ChatCompletion } from "openai/resources/chat/completions";

export default class OpenAIRecipeInferenceService implements RecipeInferenceService {
  private readonly client: OpenAI;
  
  public constructor(openAiClientGenerator: (apiKey: string, baseURL: string) => OpenAI) {
    this.client = openAiClientGenerator(process.env["INFERENCE_API_KEY"]!, process.env["INFERENCE_API_URL"]!);
  }
  
  public async generateRecipe(ingredients: string[]): Promise<GeneratedRecipeResponse> {
    
    const generationResponse = await this.client.chat.completions.create({
      model: "shaylinc/dut-recipe-generator",
      messages: [
        { "role": "user", "content": this.generatePrompt(ingredients) }
      ],
      temperature: 0.2,
      max_tokens: 1024,
      stream: false
    });
    
    return this.tryParseRecipeResponse(generationResponse);
  }
  
  private tryParseRecipeResponse(generationResponse: ChatCompletion): GeneratedRecipeResponse {
    if (!generationResponse || !generationResponse.choices) {
      return {
        success: false
      };
    }
    
    try {
      const parsedRecipe = JSON.parse(generationResponse.choices[0].message.content!);
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
  
  private generatePrompt(ingredients: string[]): string {
    return `{"prompt": ${JSON.stringify(ingredients)}`;
  }
}