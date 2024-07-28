import CompletionParameters from "@/services/completions/completionParameters";
import CompletionsService from "@/services/completions/completionsService";

export default class OpenAICompletionsService implements CompletionsService {
  async generateCompletions(parameters: CompletionParameters): Promise<string> {
    const completionUrl = `${parameters.baseUrl}/completions`;
    
    const response = await fetch(completionUrl,
      {
        method: "POST",
        body: JSON.stringify(
          {
            model: parameters.modelName,
            prompt: parameters.prompt,
            max_tokens: parameters.maxTokens,
            temperature: parameters.temperature
          }
        ),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${parameters.apiKey}`
        }
      }
    );
    
    const jsonResponse = await response.json();
    
    return `${parameters.prompt}${jsonResponse["choices"][0]["text"]}`;
  }
}