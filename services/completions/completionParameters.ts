export default interface CompletionParameters {
  baseUrl: string;
  modelName: string;
  apiKey: string;
  prompt: string;
  maxTokens: number;
  temperature: number;
}