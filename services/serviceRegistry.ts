import RecipeInferenceService from "@/services/recipeInference/recipeInferenceService";
import OpenAIRecipeInferenceService from "@/services/recipeInference/openAIRecipeInferenceService";
import IngredientsFormattingService from "@/services/ingredientsFormatting/ingredientsFormattingService";
import CompletionsService from "@/services/completions/completionsService";
import OpenAICompletionsService from "@/services/completions/openAICompletionsService";
import FeedbackService from "@/services/feedback/feedbackService";
import DynamoDbFeedbackService from "@/services/feedback/dynamoDbFeedbackService";

export default class ServiceRegistry {
  private static completionsService: CompletionsService;
  private static recipeInferenceService: RecipeInferenceService;
  private static ingredientsFormattingService: IngredientsFormattingService;
  private static feedbackService: FeedbackService;
  
  public static getCompletionsService(): CompletionsService {
    if (this.completionsService == null) {
      this.completionsService = new OpenAICompletionsService(fetch);
    }
    
    return this.completionsService;
  }
  
  public static getRecipeInferenceService(): RecipeInferenceService {
    if (this.recipeInferenceService == null) {
      this.recipeInferenceService = new OpenAIRecipeInferenceService()
      ;
    }
    
    return this.recipeInferenceService;
  }
  
  public static getIngredientsFormattingService(): IngredientsFormattingService {
    if (this.ingredientsFormattingService == null) {
      this.ingredientsFormattingService = new IngredientsFormattingService();
    }
    
    return this.ingredientsFormattingService;
  }
  
  public static getFeedbackService(): FeedbackService {
    if (this.feedbackService == null) {
      this.feedbackService = new DynamoDbFeedbackService();
    }
    
    return this.feedbackService;
  }
}