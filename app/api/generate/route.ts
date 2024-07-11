import ServiceRegistry from "@/services/serviceRegistry";
import { RecipeGenerationRequest } from "@/app/api/generate/recipeGenerationRequest";

export async function POST(request: Request): Promise<Response> {
  const inferenceService = ServiceRegistry.getRecipeInferenceService();
  
  const requestBody = await request.json() as RecipeGenerationRequest;
  
  //TODO: validate ingredients beforehand with validation service and return 400 with a message beforehand
  const completions = await inferenceService.generateRecipe(requestBody.ingredients.split(","));
  
  const statusCode = completions.success ? 200 : 500;
  
  return new Response(JSON.stringify(completions), { status: statusCode });
}