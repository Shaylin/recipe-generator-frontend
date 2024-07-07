import { ChangeEvent, JSX } from "react";

export default function IngredientsInput(props: { onUpdate: (ingredientsList: string) => void }): JSX.Element {
  return (
    <div>
      <input type="text" placeholder="Enter Ingredients..."
        onChange={((changeEvent: ChangeEvent<HTMLInputElement>) => props.onUpdate(changeEvent.target.value))}/>
    </div>
  )
}