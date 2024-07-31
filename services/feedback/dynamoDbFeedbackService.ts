import FeedbackService from "@/services/feedback/feedbackService";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { GeneratedRecipeResponse } from "../recipeInference/generatedRecipeResponse";
import { randomUUID } from "crypto";

export default class DynamoDbFeedbackService implements FeedbackService {
  private readonly client: DynamoDBClient;
  
  constructor() {
    this.client = new DynamoDBClient(
      {
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
        }
      }
    );
  }
  
  async sendFeedback(good: boolean, response: GeneratedRecipeResponse): Promise<boolean> {
    const putItemCommand = new PutItemCommand({
      TableName: process.env.FEEDBACK_TABLE_NAME!,
      Item: {
        id: { S: randomUUID() },
        ingredients: { S: response.ingredients!.join(",") },
        generatedText: {
          S: JSON.stringify({
            title: response.title,
            ingredients: response.ingredients,
            method: response.method
          })
        },
        feedback: { S: good ? "good" : "bad" }
      }
    });
    
    try {
      await this.client.send(putItemCommand);
    } catch (exception) {
      console.error(exception);
      return false;
    }
    return true;
  }
}