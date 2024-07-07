import ServiceRegistry from "@/services/serviceRegistry";

export async function POST(request: Request): Promise<Response> {
  const inferenceService = ServiceRegistry.getRecipeInferenceService();
  
  const completions = await inferenceService.generateRecipe(["onions", "peppers", "chicken", "rice"]);
  
  return new Response(JSON.stringify(completions), {
    status: 200,
  });
}