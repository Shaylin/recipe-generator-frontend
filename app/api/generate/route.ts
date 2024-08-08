import ServiceRegistry from "@/services/serviceRegistry";
import { RecipeGenerationRequest } from "@/app/api/generate/recipeGenerationRequest";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const inferenceService = ServiceRegistry.getRecipeInferenceService();
  
  const requestBody = await request.json() as RecipeGenerationRequest;
  
  //TODO: validate ingredients beforehand with validation service and return 400 with a message beforehand
  const completions = await inferenceService.generateRecipe(requestBody.ingredients);
  
  const statusCode = completions.success ? 200 : 500;
  
  return new NextResponse(JSON.stringify(completions), { status: statusCode });
}