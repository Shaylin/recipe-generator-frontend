import React, { JSX, KeyboardEvent, useRef, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";

export default function IngredientsInput(props: {
  onIngredientAdded: (ingredient: string) => void,
  isGenerating: boolean
}): JSX.Element {
  const [currentIngredient, setCurrentIngredient] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  
  const addCurrentIngredient = (): void => {
    if (currentIngredient.trim() === "") return;
    props.onIngredientAdded(currentIngredient.trim());
    setCurrentIngredient("");
  }
  
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" || event.key === "," || event.key === ".") {
      addCurrentIngredient();
    }
  };
  
  const onValueChange = (value: string): void => {
    if (value.endsWith(",") || value.endsWith(".")) return;
    setCurrentIngredient(value);
  }
  
  const onAddClicked = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    
    if (ref?.current) {
      ref.current.focus();
    }
    
    addCurrentIngredient();
  }
  
  return (
    <div className="flex relative">
      <Input
        type="text"
        placeholder="Enter an Ingredient"
        value={currentIngredient}
        className="min-w-64"
        onValueChange={onValueChange}
        onKeyDown={onKeyDown}
        size="lg"
        isDisabled={props.isGenerating}
        ref={ref}
      />
      {currentIngredient.length > 2 &&
        <Button className="absolute right-1 top-2/4 -translate-y-2/4 z-10" size="md" isIconOnly={true}
          isDisabled={props.isGenerating} onClick={onAddClicked} color="secondary">
          <Image className="brightness-200" src="images/return.svg" alt="thumbs up feedback icon" width={24}
            height={24}/>
        </Button>}
    </div>
  )
}