import IngredientsFormattingService from "@/services/ingredientsFormatting/ingredientsFormattingService";

describe("IngredientsFormattingService", () => {
  let formattingService: IngredientsFormattingService;
  
  beforeEach(() => {
    formattingService = new IngredientsFormattingService();
  })
  
  describe("Constructor", () => {
    it("Should construct", () => {
      expect(formattingService).not.toBeNull();
      expect(formattingService).toBeInstanceOf(IngredientsFormattingService);
    });
  });
  
  
  describe("createFormattedIngredientsPrompt", () => {
    it("Should generate a prompt and convert all ingredients to lowercase", () => {
      const inputIngredients = ["PoTaTo", "CHEESE", "onion"];
      
      const prompt = formattingService.createdFormattedIngredientsPrompt(inputIngredients);
      
      expect(prompt).toBe('{"prompt": ["potato", "cheese", "onion"]');
    });
    
    it("Should generate a prompt and trim surrounding spaces and tabs from the ingredients", () => {
      const inputIngredients = ["   PoPaTo", "figs  ", "     onion \t"];
      
      const prompt = formattingService.createdFormattedIngredientsPrompt(inputIngredients);
      
      expect(prompt).toBe('{"prompt": ["popato", "figs", "onion"]');
    });
    
    it("Should generate a valid prompt with just one ingredient", () => {
      const inputIngredients = ["water"];
      
      const prompt = formattingService.createdFormattedIngredientsPrompt(inputIngredients);
      
      expect(prompt).toBe('{"prompt": ["water"]');
    });
    
    it("Should filter out any ingredients shorter than 3 characters long", () => {
      const inputIngredients = ["water", "a", "oi", "fig"];
      
      const prompt = formattingService.createdFormattedIngredientsPrompt(inputIngredients);
      
      expect(prompt).toBe('{"prompt": ["water", "fig"]');
    });
  });
})