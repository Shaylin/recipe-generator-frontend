import { mock, MockProxy } from "jest-mock-extended";
import RecipeInferenceService from "@/services/recipeInference/recipeInferenceService";
import ServiceRegistry from "@/services/serviceRegistry";
import { RecipeGenerationRequest } from "@/app/api/generate/recipeGenerationRequest";
import { POST } from "@/app/api/generate/route";
import { NextRequest } from "next/server";

describe("Generate Route", () => {
  let mockInferenceService: MockProxy<RecipeInferenceService>;
  
  beforeEach(() => {
    mockInferenceService = mock<RecipeInferenceService>();
    
    ServiceRegistry.getRecipeInferenceService = jest.fn().mockReturnValue(mockInferenceService);
  });
  
  describe("When the recipe generation is successful", () => {
    it("Should return a status 200 along with the successful recipe generation", async () => {
      mockInferenceService.generateRecipe.mockResolvedValue({
        success: true,
        title: "apple cobbler",
        ingredients: ["1 pack apples", "1 cup wheat flour", "1 cup water"],
        method: ["mix", "bake", "enjoy"]
      });
      
      const fakeRequestBody: RecipeGenerationRequest = {
        ingredients: ["apple", "sugar", "wheat flour", "cinnamon"]
      };
      
      const fakeRequest = {
        json: async () => fakeRequestBody
      };
      
      const response = await POST(fakeRequest as unknown as NextRequest);
      
      expect(response.status).toBe(200);
      
      const responseBody = await response.json();
      
      expect(responseBody.success).toBe(true);
      expect(responseBody.title).toBe("apple cobbler");
      expect(responseBody.ingredients).toEqual(["1 pack apples", "1 cup wheat flour", "1 cup water"]);
      expect(responseBody.method).toEqual(["mix", "bake", "enjoy"]);
    });
  });
  
  
  describe("When the recipe generation fails", () => {
    it("Should return a status 500 with an unsuccessful recipe generation", async () => {
      mockInferenceService.generateRecipe.mockResolvedValue({
        success: false
      });
      
      const fakeRequestBody: RecipeGenerationRequest = {
        ingredients: ["pear", "sugar", "wheat flour", "cinnamon"]
      };
      
      const fakeRequest = {
        json: async () => fakeRequestBody
      };
      
      const response = await POST(fakeRequest as unknown as NextRequest);
      
      expect(response.status).toBe(500);
      
      const responseBody = await response.json();
      
      expect(responseBody.success).toBe(false);
      expect(responseBody.title).toBe(undefined);
    });
  });
});