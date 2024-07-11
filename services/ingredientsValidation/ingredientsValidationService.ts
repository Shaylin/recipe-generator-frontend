import { ValidationResponse } from "@/services/ingredientsValidation/validationResponse";

export interface IngredientsValidationService {
  isValid(ingredients: string): ValidationResponse;
}