import OpenAIRecipeInferenceService from "@/services/recipeInference/openAIRecipeInferenceService";

describe("OpenAIRecipeInferenceService", () => {
  let service: OpenAIRecipeInferenceService;
  let mockOpenAIClientGenerator: jest.Mock;
  let fakeOpenAIClient: { createCompletions: jest.Mock };
  let consoleErrorSpy: jest.Mock;
  let originalConsoleError: (args: any) => void;
  
  beforeEach(() => {
    process.env = {
      NODE_ENV: "test",
      INFERENCE_API_KEY: "fakeKey",
      INFERENCE_API_URL: "fakeURL"
    };
    
    consoleErrorSpy = jest.fn();
    
    originalConsoleError = console.error;
    console.error = consoleErrorSpy;
    
    mockOpenAIClientGenerator = jest.fn();
    fakeOpenAIClient = { createCompletions: jest.fn() };
    mockOpenAIClientGenerator.mockReturnValue(fakeOpenAIClient);
    
    service = new OpenAIRecipeInferenceService(mockOpenAIClientGenerator);
  });
  
  afterAll(() => {
    console.error = originalConsoleError;
  })
  
  describe("Constructor", () => {
    it("Should construct with the provided api key and inference url set as environment variables", () => {
      expect(service).not.toBeNull();
      
      expect(mockOpenAIClientGenerator).toHaveBeenCalledWith("fakeKey", "fakeURL");
    })
  });
  
  describe("generateRecipe", () => {
    it("Should trim and lowercase the input ingredients array before passing it to the inference api", async () => {
      fakeOpenAIClient.createCompletions.mockResolvedValue({
        choices: [
          {
            text: ', "title": "My Recipe", "ingredients": ["onion", "pepper"], "method": ["mix well"] }'
          }
        ]
      });
      
      const generatedRecipeResponse = await service.generateRecipe(["OnIoN", "    peppeR "]);
      
      expect(fakeOpenAIClient.createCompletions).toHaveBeenCalledWith({
        model: "shaylinc/dut-recipe-generator",
        prompt: '{"prompt": ["onion","pepper"]',
        max_tokens: 1024,
        temperature: 0.2
      });
    });
    
    
    describe("When the server returns a valid JSON response", () => {
      it("Should return a successful recipe response", async () => {
        fakeOpenAIClient.createCompletions.mockResolvedValue({
          choices: [
            {
              text: ', "title": "My Recipe", "ingredients": ["onion", "pepper"], "method": ["mix well"] }'
            }
          ]
        });
        
        const generatedRecipeResponse = await service.generateRecipe(["onion", "pepper"]);
        
        expect(fakeOpenAIClient.createCompletions).toHaveBeenCalledWith({
          model: "shaylinc/dut-recipe-generator",
          prompt: '{"prompt": ["onion","pepper"]',
          max_tokens: 1024,
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
        fakeOpenAIClient.createCompletions.mockResolvedValue({
          choices: [
            {
              text: ', "title": "My Recipe", ingredients: ["onionez", "pepper", "method": ["mix well"] }'
            }
          ]
        });
        
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
        fakeOpenAIClient.createCompletions.mockResolvedValue(null);
        
        const generatedRecipeResponse = await service.generateRecipe(["onion", "paper"]);
        expect(generatedRecipeResponse.success).toBe(false);
        expect(generatedRecipeResponse.title).toBeFalsy();
        expect(generatedRecipeResponse.ingredients).toBeFalsy();
        expect(generatedRecipeResponse.method).toBeFalsy();
      });
    });
  })
})