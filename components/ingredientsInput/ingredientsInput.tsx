import { ChangeEvent, JSX } from "react";
import { Input } from "@headlessui/react";

export default function IngredientsInput(props: { onUpdate: (ingredientsList: string) => void }): JSX.Element {
  return (
    <div>
      <Input type="text" placeholder="Enter Ingredients..."
        className="input input-bordered input-neutral w-full max-w-lg"
        onChange={((changeEvent: ChangeEvent<HTMLInputElement>) => props.onUpdate(changeEvent.target.value))}/>
    </div>
  )
}