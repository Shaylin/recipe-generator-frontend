import { JSX, useState } from "react";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";
import Image from "next/image";
import { GeneratedRecipeFeedback } from "@/app/api/feedback/generatedRecipeFeedback";
import { Button } from "@nextui-org/button";

export default function FeedbackPair(props: { response: GeneratedRecipeResponse }): JSX.Element {
  const [feedbackSent, setFeedbackSent] = useState<boolean | null>(null);
  
  const sendFeedback = (isGoodFeedback: boolean) => {
    setFeedbackSent(isGoodFeedback);
    
    const responseFeedback: GeneratedRecipeFeedback = {
      response: props.response,
      good: isGoodFeedback
    };
    
    fetch("/api/feedback", { method: "POST", body: JSON.stringify(responseFeedback) })
      .then(response => response.json());
  };
  
  const isAnyButtonSelected = feedbackSent === null;
  const isGoodButtonSelected = feedbackSent === true;
  const isBadButtonSelected = feedbackSent === false;
  const feedbackButtonStyle = isAnyButtonSelected ? "hover:bg-highlight-tone bg-transparent" : "pointer-events-none";
  
  return (
    <div className="w-full flex flex-row justify-end gap-2">
      <Button isIconOnly onClick={() => sendFeedback(true)}
        className={`p-1 rounded ${feedbackButtonStyle}  ${isGoodButtonSelected ? "bg-highlight-tone" : "bg-transparent"} ${isBadButtonSelected ? "opacity-25" : "opacity-100"}`}>
        <Image className="brightness-200" src="images/thumbUp.svg" alt="thumbs up feedback icon" width={24}
          height={24}/>
      </Button>
      
      <Button isIconOnly onClick={() => sendFeedback(false)}
        className={`p-1 rounded ${feedbackButtonStyle} ${isBadButtonSelected ? "bg-highlight-tone" : "bg-transparent"} ${isGoodButtonSelected ? "opacity-25" : "opacity-100"}`}>
        <Image src="images/thumbDown.svg" alt="thumbs up feedback icon" width={24} height={24}/>
      </Button>
    </div>
  )
}