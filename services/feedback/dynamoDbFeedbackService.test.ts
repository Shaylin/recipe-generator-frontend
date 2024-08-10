import DynamoDbFeedbackService from "@/services/feedback/dynamoDbFeedbackService";
import { AwsClientStub, mockClient } from "aws-sdk-client-mock";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import "aws-sdk-client-mock-jest";

describe("DynamoDbFeedbackService", () => {
  let dynamoClientMock: AwsClientStub<DynamoDBClient>;
  let feedbackService: DynamoDbFeedbackService;
  
  beforeEach(() => {
    process.env.FEEDBACK_TABLE_NAME = "test-table";
    dynamoClientMock = mockClient(DynamoDBClient);
    feedbackService = new DynamoDbFeedbackService();
  });
  
  describe("Constructor", () => {
    it("Should construct", () => {
      expect(feedbackService).toBeInstanceOf(DynamoDbFeedbackService);
    });
  });
  
  describe("sendFeedback", () => {
    describe("When feedback is successfully captured", () => {
      it("Should invoke the put item command with the given feedback and return true", async () => {
        dynamoClientMock.send.resolves({ $metadata: {}, Item: { test: { N: "1" } } });
        
        const response = await feedbackService.sendFeedback(false, {
          success: true,
          title: "lazy frozen pizza",
          ingredients: ["pear", "sugar", "wheat flour", "cinnamon"],
          method: ["mix", "bake", "enjoy"]
        });
        
        expect(response).toBe(true);
        
        expect(dynamoClientMock).toHaveReceivedCommandWith(PutItemCommand,
          {
            TableName: "test-table",
            Item: {
              id: { S: expect.any(String) },
              ingredients: { S: ["pear", "sugar", "wheat flour", "cinnamon"].join(",") },
              generatedText: {
                S: JSON.stringify({
                  title: "lazy frozen pizza",
                  ingredients: ["pear", "sugar", "wheat flour", "cinnamon"],
                  method: ["mix", "bake", "enjoy"]
                })
              },
              feedback: { S: "bad" }
            }
          });
      });
    });
    
    describe("When feedback capture fails", () => {
      it("Should return false", async () => {
        dynamoClientMock.send.throws("test error, don't be alarmed");
        
        const response = await feedbackService.sendFeedback(false, {
          success: true,
          title: "lazy frozen pizza",
          ingredients: ["pear", "sugar", "wheat flour", "cinnamon"],
          method: ["mix", "bake", "enjoy"]
        });
        
        expect(response).toBe(false);
      });
    });
  });
});