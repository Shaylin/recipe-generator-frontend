import OpenAIRecipeInferenceService from "@/services/recipeInference/openAIRecipeInferenceService";
import IngredientsFormattingService from "@/services/ingredientsFormatting/ingredientsFormattingService";
import { mock, MockProxy } from "jest-mock-extended";
import ServiceRegistry from "@/services/serviceRegistry";
import CompletionsService from "@/services/completions/completionsService";

describe("OpenAIRecipeInferenceService", () => {
  let service: OpenAIRecipeInferenceService;
  let consoleErrorSpy: jest.Mock;
  let originalConsoleError: (args: any) => void;
  let mockIngredientFormatter: MockProxy<IngredientsFormattingService>;
  let mockCompletionsService: MockProxy<CompletionsService>;
  
  beforeEach(() => {
    process.env = {
      NODE_ENV: "test",
      INFERENCE_API_KEY: "fakeKey",
      INFERENCE_API_URL: "fakeURL"
    };
    
    consoleErrorSpy = jest.fn();
    
    originalConsoleError = console.error;
    console.error = consoleErrorSpy;
    
    mockCompletionsService = mock<CompletionsService>();
    
    mockIngredientFormatter = mock<IngredientsFormattingService>();
    
    ServiceRegistry.getIngredientsFormattingService = jest.fn().mockReturnValue(mockIngredientFormatter);
    ServiceRegistry.getCompletionsService = jest.fn().mockReturnValue(mockCompletionsService);
    
    service = new OpenAIRecipeInferenceService();
  });
  
  afterAll(() => {
    console.error = originalConsoleError;
  })
  
  describe("Constructor", () => {
    it("Should construct with the provided api key and inference url set as environment variables", () => {
      expect(service).not.toBeNull();
    })
  });
  
  describe("generateRecipe", () => {
    it("Should format the input ingredients using the ingredients formatting service before passing it to the inference api", async () => {
      mockCompletionsService.generateCompletions.mockResolvedValue(
        '{"prompt": ["onion","pepper"], "title": "My Recipe", "ingredients": ["onion", "pepper"], "method": ["mix well"] }'
      );
      
      mockIngredientFormatter.createdFormattedIngredientsPrompt.mockReturnValue('{"prompt": ["onion","pepper"]');
      
      const badlyFormattedIngredients = ["OnIoN", "    peppeR "];
      
      await service.generateRecipe(badlyFormattedIngredients);
      
      expect(mockIngredientFormatter.createdFormattedIngredientsPrompt).toHaveBeenCalledWith(badlyFormattedIngredients);
      
      expect(mockCompletionsService.generateCompletions).toHaveBeenCalledWith({
        apiKey: "fakeKey",
        baseUrl: "fakeURL",
        modelName: "shaylinc/dut-recipe-generator",
        prompt: '{"prompt": ["onion","pepper"]',
        maxTokens: 1024,
        temperature: 0.2
      });
    });
    
    
    describe("When the server returns a valid JSON response", () => {
      it("Should return a successful recipe response", async () => {
        mockCompletionsService.generateCompletions.mockResolvedValue(
          '{"prompt": ["onion","pepper"], "title": "My Recipe", "ingredients": ["onion", "pepper"], "method": ["mix well"] }'
        );
        
        mockIngredientFormatter.createdFormattedIngredientsPrompt.mockReturnValue('{"prompt": ["onion","pepper"]');
        
        const generatedRecipeResponse = await service.generateRecipe(["onion", "pepper"]);
        
        expect(mockCompletionsService.generateCompletions).toHaveBeenCalledWith({
          apiKey: "fakeKey",
          baseUrl: "fakeURL",
          modelName: "shaylinc/dut-recipe-generator",
          prompt: '{"prompt": ["onion","pepper"]',
          maxTokens: 1024,
          temperature: 0.2
        });
        
        expect(generatedRecipeResponse.success).toBe(true);
        expect(generatedRecipeResponse.title).toBe("My Recipe");
        expect(generatedRecipeResponse.ingredients).toStrictEqual(["onion", "pepper"]);
        expect(generatedRecipeResponse.method).toStrictEqual(["mix well"]);
      });
    });
    
    describe("When the server returns a response that is not valid JSON", () => {
      it("Should return an empty failure response", async () => {
        mockCompletionsService.generateCompletions.mockResolvedValue(
          'onion","pepper"], "titl}'
        );
        
        mockIngredientFormatter.createdFormattedIngredientsPrompt.mockReturnValue('{"prompt": ["onion","pepper"]');
        
        const generatedRecipeResponse = await service.generateRecipe(["onion", "pepper"]);
        expect(generatedRecipeResponse.success).toBe(false);
        expect(generatedRecipeResponse.title).toBeFalsy();
        expect(generatedRecipeResponse.ingredients).toBeFalsy();
        expect(generatedRecipeResponse.method).toBeFalsy();
        
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      });
    });
    
    describe("When the server does not return a valid response", () => {
      it("Should return an empty failure response", async () => {
        mockCompletionsService.generateCompletions.mockResolvedValue(
          ""
        );
        
        const generatedRecipeResponse = await service.generateRecipe(["onion", "paper"]);
        expect(generatedRecipeResponse.success).toBe(false);
        expect(generatedRecipeResponse.title).toBeFalsy();
        expect(generatedRecipeResponse.ingredients).toBeFalsy();
        expect(generatedRecipeResponse.method).toBeFalsy();
      });
    });
  })
})