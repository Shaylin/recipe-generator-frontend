import CompletionParameters from "@/services/completions/completionParameters";

export default interface CompletionsService {
  generateCompletions(parameters: CompletionParameters): Promise<string>;
}