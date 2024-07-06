import OpenAIRecipeInferenceService from "@/services/recipeInference/openAIRecipeInferenceService";

describe("OpenAIRecipeInferenceService", () => {
  let service: OpenAIRecipeInferenceService;
  let mockOpenAIClientGenerator: jest.Mock;
  let fakeOpenAIClient: { chat: { completions: { create: jest.Mock } } };
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
    fakeOpenAIClient = { chat: { completions: { create: jest.fn() } } };
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
    describe("When the server returns a valid JSON response", () => {
      it("Should return a successful recipe response", async () => {
        fakeOpenAIClient.chat.completions.create.mockResolvedValue({
          choices: [
            {
              message: {
                content: JSON.stringify({ title: "My Recipe", ingredients: ["onion", "pepper"], method: ["mix well"] })
              }
            }
          ]
        });
        
        const generatedRecipeResponse = await service.generateRecipe(["onion", "pepper"]);
        
        expect(fakeOpenAIClient.chat.completions.create).toHaveBeenCalledWith({
          model: "shaylinc/dut-recipe-generator",
          messages: [
            { "role": "user", "content": `{"prompt": ${JSON.stringify(["onion", "pepper"])}` }
          ],
          stream: false,
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
        fakeOpenAIClient.chat.completions.create.mockResolvedValue({
          choices: [
            {
              message: {
                content: 'title: "My Recipe", ingredients: ["onionez", "pepper"]'
              }
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
        fakeOpenAIClient.chat.completions.create.mockResolvedValue(null);
        
        const generatedRecipeResponse = await service.generateRecipe(["onion", "paper"]);
        expect(generatedRecipeResponse.success).toBe(false);
        expect(generatedRecipeResponse.title).toBeFalsy();
        expect(generatedRecipeResponse.ingredients).toBeFalsy();
        expect(generatedRecipeResponse.method).toBeFalsy();
      });
    });
  })
})