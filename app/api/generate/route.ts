import OpenAI from "openai";
import ServiceRegistry from "@/services/serviceRegistry";

export async function POST(request: Request): Promise<Response> {
  const openai = new OpenAI({
    apiKey: process.env["INFERENCE_API_KEY"],
    baseURL: process.env["INFERENCE_API_URL"]
  });
  
  const completions = await openai.chat.completions.create({
    model: "shaylinc/dut-recipe-generator",
    messages: [
      { "role": "user", "content": '{"prompt": ["pork", "onion", "rice"]' }
    ],
    temperature: 0.2,
    max_tokens: 1024,
    stream: false
  });
  
  
  return new Response(JSON.stringify({ message: completions.choices[0].message.content }), {
    status: 200,
  });
}