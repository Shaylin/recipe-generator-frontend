import { ValidationResponse } from "./validationResponse";

export interface IngredientsValidationService {
  isValid(ingredients: string): ValidationResponse;
}