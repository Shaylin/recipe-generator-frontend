import { ChangeEvent, JSX, KeyboardEvent, useState } from "react";
import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/react";

export default function IngredientsInput(props: {
  onIngredientAdded: (ingredient: string) => void
}): JSX.Element {
  const [currentIngredient, setCurrentIngredient] = useState<string>("");
  
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" || event.key === ",") {
      props.onIngredientAdded(currentIngredient);
      setCurrentIngredient("");
    }
    console.log("On Key Down " + event.key);
  };
  
  const onValueChange = (value: string): void => {
    if (value.endsWith(",") || value.endsWith(".")) return;
    setCurrentIngredient(value);
  }
  
  return (
    <div>
      <Input type="text" placeholder="Enter Ingredients..." value={currentIngredient} className="min-w-64"
        onValueChange={onValueChange} onKeyDown={onKeyDown}/>
    </div>
  )
}