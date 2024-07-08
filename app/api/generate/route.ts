import ServiceRegistry from "@/services/serviceRegistry";
import { RecipeGenerationRequest } from "@/app/api/generate/recipeGenerationRequest";

export async function POST(request: Request): Promise<Response> {
  const inferenceService = ServiceRegistry.getRecipeInferenceService();
  
  
  const requestBody = await request.json() as RecipeGenerationRequest;
  
  const completions = await inferenceService.generateRecipe(requestBody.ingredients.split(","));
  
  return new Response(JSON.stringify(completions), {
    status: 200,
  });
}