import { ChangeEvent, JSX, useState } from "react";
import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/react";

export default function IngredientsInput(props: { onUpdate: (ingredientsList: string) => void }): JSX.Element {
  const [ingredients, setIngredients] = useState<string[]>(["potato", "cheddar cheese"]);
  
  return (
    <div>
      <Input type="text" placeholder="Enter Ingredients..." className="min-w-64"
        onChange={((changeEvent: ChangeEvent<HTMLInputElement>) => props.onUpdate(changeEvent.target.value))}/>
    </div>
  )
}