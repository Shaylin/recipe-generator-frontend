import { ChangeEvent, JSX } from "react";
import { Input } from "@nextui-org/input";

export default function IngredientsInput(props: { onUpdate: (ingredientsList: string) => void }): JSX.Element {
  return (
    <div>
      <Input type="text" placeholder="Enter Ingredients..."
        className="input input-bordered input-neutral max-w-sm"
        onChange={((changeEvent: ChangeEvent<HTMLInputElement>) => props.onUpdate(changeEvent.target.value))}/>
    </div>
  )
}