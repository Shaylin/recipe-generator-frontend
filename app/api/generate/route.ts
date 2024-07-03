import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

const tableName = "recipe-database";

const client: DynamoDBClient = new DynamoDBClient(
  {
    region: "af-south-1",
    credentials: {
      accessKeyId: process.env.AWS_USER_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_USER_SECRET_KEY ?? ""
    }
  }
);

interface RecipeFormData {
  title: string,
  serves: string,
  ingredients: Array<{ name: string }>,
  steps: Array<{ step: string }>
}

export async function POST(request: Request): Promise<Response> {
  const formData = await request.json() as RecipeFormData;
  
  console.log(formData)
  
  if (!areServesValid(formData)) {
    return new Response(JSON.stringify({message: "Number of servings should be numeric only. Example: 4"}), {
      status: 400,
    })
  }
  
  if (!areIngredientsValid(formData)) {
    return new Response(JSON.stringify({message: "Missing or invalid ingredients."}), {
      status: 400,
    })
  }
  
  if (!areStepsValid(formData)) {
    return new Response(JSON.stringify({message: "Missing or invalid method steps."}), {
      status: 400,
    })
  }
  
  const recipeExists = await doesRecipeExist(formData);
  
  if (recipeExists) {
    return new Response(JSON.stringify({message: `A recipe named ${formData.title} already exists in the database`}), {
      status: 400,
    })
  }
  
  const putRecipeResponse = await putRecipe(formData);
  
  if (!putRecipeResponse) {
    return new Response(JSON.stringify({message: `Failed to add ${formData.title} to the database due to a technical issue. Please contact the developer for support.`}), {
      status: 400,
    })
  }
  
  return new Response(JSON.stringify({message: formData.title}), {
    status: 200,
  })
}

function areIngredientsValid(formData: RecipeFormData): boolean {
  if (formData.ingredients.length == 0) return false;
  
  for (const ingredient of formData.ingredients) {
    if (!ingredient.name) return false;
  }
  
  return true;
}

function areServesValid(formData: RecipeFormData): boolean {
  if (formData.serves.length == 0) return false;
  
  return !isNaN(parseInt(formData.serves));
}

function areStepsValid(formData: RecipeFormData): boolean {
  if (formData.steps.length == 0) return false;
  
  for (const step of formData.steps) {
    if (!step.step) return false;
  }
  
  return true;
}

async function doesRecipeExist(formData: RecipeFormData): Promise<boolean> {
  const getItemCommand = new GetItemCommand({
    TableName: tableName,
    Key: {recipeName: {S: formData.title}}
  });
  
  const response = await client.send(getItemCommand);
  
  return !!response.Item;
}

async function putRecipe(formData: RecipeFormData): Promise<boolean> {
  const putItemCommand = new PutItemCommand({
    TableName: tableName,
    Item: {
      recipeName: {S: formData.title},
      serves: {S: formData.serves},
      ingredients: {
        L: formData.ingredients.map((ingredient: { name: string }) => {
          return {S: ingredient.name};
        })
      },
      steps: {
        L: formData.steps.map((methodStep: { step: string }) => {
          return {S: methodStep.step};
        })
      }
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