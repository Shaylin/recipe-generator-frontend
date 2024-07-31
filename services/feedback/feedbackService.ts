import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";

export default interface FeedbackService {
  sendFeedback(good: boolean, response: GeneratedRecipeResponse): Promise<boolean>;
}