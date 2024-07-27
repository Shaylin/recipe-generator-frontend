export default class IngredientsFormattingService {
  createdFormattedIngredientsPrompt(ingredients: string[]): string {
    let ingredientList = ingredients.map((ingredient: string) => ingredient.trim().toLowerCase());
    ingredientList = ingredientList.filter((ingredient: string) => ingredient.length > 2);
    
    let spacedStrigifiedList = "";
    
    for (let ingredientIndex = 0; ingredientIndex < ingredientList.length; ingredientIndex++) {
      if (ingredientIndex === ingredientList.length - 1) {
        spacedStrigifiedList += `"${ingredientList[ingredientIndex]}"`
      } else {
        spacedStrigifiedList += `"${ingredientList[ingredientIndex]}", `
      }
    }
    
    return `{"prompt": [${spacedStrigifiedList}]`;
  }
}