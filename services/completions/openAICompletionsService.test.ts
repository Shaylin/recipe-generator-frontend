import OpenAICompletionsService from "@/services/completions/openAICompletionsService";

describe("OpenAICompletionsService", () => {
  let completionsService: OpenAICompletionsService;
  let mockFetch = jest.fn();
  
  beforeEach(() => {
    completionsService = new OpenAICompletionsService(mockFetch);
  });
  
  describe("Constructor", () => {
    it("Should construct", () => {
      expect(completionsService).toBeInstanceOf(OpenAICompletionsService);
    });
  });
  
  describe("generateCompletions", () => {
    it("Should make a POST request using the supplied parameters and return the json response", async () => {
      mockFetch.mockResolvedValue({
        json: async () => {
          return {
            choices: [
              { text: "I don't know" }
            ]
          }
        }
      });
      
      const response = await completionsService.generateCompletions({
        apiKey: "glubglub",
        baseUrl: "https://api.base",
        maxTokens: 100,
        modelName: "big-one",
        prompt: "what is the square root of pi? ",
        temperature: 0.1
      });
      
      expect(mockFetch).toHaveBeenCalledWith("https://api.base/completions", {
        method: "POST",
        body: JSON.stringify({
          model: "big-one",
          prompt: "what is the square root of pi? ",
          max_tokens: 100,
          temperature: 0.1
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer glubglub"
        }
      });
      
      expect(response).toBe("what is the square root of pi? I don't know");
    });
  });
});