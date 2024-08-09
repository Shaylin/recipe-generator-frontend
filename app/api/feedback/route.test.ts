import ServiceRegistry from "@/services/serviceRegistry";
import { mock, MockProxy } from "jest-mock-extended";
import FeedbackService from "@/services/feedback/feedbackService";
import { GeneratedRecipeFeedback } from "@/app/api/feedback/generatedRecipeFeedback";
import { POST } from "@/app/api/feedback/route";
import { NextRequest } from "next/server";

describe("Feedback Route", () => {
  let mockFeedbackService: MockProxy<FeedbackService>;
  
  beforeEach(() => {
    mockFeedbackService = mock<FeedbackService>();
    ServiceRegistry.getFeedbackService = jest.fn().mockReturnValue(mockFeedbackService);
  });
  
  describe("When the feedback request is successful", () => {
    it("Should return a status 200", async () => {
      mockFeedbackService.sendFeedback.mockResolvedValueOnce(true);
      
      const fakeFeedback: GeneratedRecipeFeedback = {
        good: false,
        response: {
          success: true,
          title: "lazy frozen pizza",
          ingredients: ["frozen pizza"],
          method: ["bake", "enjoy"]
        }
      };
      
      const fakeRequest = {
        json: async () => fakeFeedback
      };
      
      const response = await POST(fakeRequest as unknown as NextRequest);
      
      expect(response.status).toBe(200);
    });
  });
  
  describe("When the feedback request is not successful", () => {
    it("Should return a status 500", async () => {
      mockFeedbackService.sendFeedback.mockResolvedValueOnce(false);
      
      const fakeFeedback: GeneratedRecipeFeedback = {
        good: false,
        response: {
          success: true,
          title: "active pizza",
          ingredients: ["flour", "yeast", "salt", "olive oil", "water", "tomato", "cheese", "basil"],
          method: ["bake", "enjoy"]
        }
      };
      
      const fakeRequest = {
        json: async () => fakeFeedback
      };
      
      const response = await POST(fakeRequest as unknown as NextRequest);
      
      expect(response.status).toBe(500);
    });
  });
})