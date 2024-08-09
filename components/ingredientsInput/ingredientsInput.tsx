import React, { ChangeEvent, JSX, KeyboardEvent, useState } from "react";
import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

export default function IngredientsInput(props: {
  onIngredientAdded: (ingredient: string) => void,
  isGenerating: boolean
}): JSX.Element {
  const [currentIngredient, setCurrentIngredient] = useState<string>("");
  
  const addIngredient = (ingredient: string): void => {
    if (currentIngredient.trim() === "") return;
    props.onIngredientAdded(currentIngredient.trim());
    setCurrentIngredient("");
  }
  
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" || event.key === "," || event.key === ".") {
      addIngredient(currentIngredient);
    }
  };
  
  const onValueChange = (value: string): void => {
    if (value.endsWith(",") || value.endsWith(".")) return;
    setCurrentIngredient(value);
  }
  
  const onAddClicked = (): void => {
    addIngredient(currentIngredient);
  }
  
  return (
    <div className="flex flex-row gap-2">
      <Input
        type="text"
        placeholder="Enter An Ingredient"
        value={currentIngredient}
        className="min-w-32"
        onValueChange={onValueChange}
        onKeyDown={onKeyDown}
        isDisabled={props.isGenerating}
      />
      
      <Button isDisabled={props.isGenerating} onClick={onAddClicked} color="secondary">Add</Button>
    </div>
  )
}