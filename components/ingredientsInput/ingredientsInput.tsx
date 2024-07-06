import { JSX } from "react";

export default function IngredientsInput(props: { onUpdate: () => void }): JSX.Element {
  return (
    <div>
      <input type="text" placeholder="Enter Ingredients..."/>
    </div>
  )
}