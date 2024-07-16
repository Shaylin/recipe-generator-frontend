import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";
import { GeneratedRecipeFeedback } from "@/app/api/feedback/generatedRecipeFeedback";

const client: DynamoDBClient = new DynamoDBClient(
  {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
  }
);

export async function POST(request: Request): Promise<Response> {
  const recipeFeedback = await request.json() as GeneratedRecipeFeedback;
  
  const putRecipeResponse = await putFeedback(recipeFeedback.good, recipeFeedback.response);
  
  if (!putRecipeResponse) {
    console.log("BADNESS");
  
    return new Response(JSON.stringify({ message: `Failed to add ${recipeFeedback.response.title} to the database due to a server issue. Please contact the developer for support.` }), {
      status: 500
    });
  }
  
  console.log("GOOD");
  
  return new Response(JSON.stringify({ message: recipeFeedback.response.title }), {
    status: 200
  });
}

async function putFeedback(good: boolean, response: GeneratedRecipeResponse): Promise<boolean> {
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
    await client.send(putItemCommand);
  } catch (exception) {
    console.error(exception);
    return false;
  }
  return true;
}