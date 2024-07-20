import { JSX, useState } from "react";
import { GeneratedRecipeResponse } from "@/services/recipeInference/generatedRecipeResponse";
import Image from "next/image";
import { GeneratedRecipeFeedback } from "@/app/api/feedback/generatedRecipeFeedback";
import { Button } from "@nextui-org/button";

export default function FeedbackPair(props: { response: GeneratedRecipeResponse }): JSX.Element {
  const [feedbackSent, setFeedbackSent] = useState<boolean | null>(null);
  
  const sendFeedback = (good: boolean) => {
    setFeedbackSent(good);
    
    const responseFeedback: GeneratedRecipeFeedback = {
      response: props.response,
      good: good
    };
    
    fetch("/api/feedback", { method: "POST", body: JSON.stringify(responseFeedback) })
      .then(response => response.json());
  };
  
  let feedbackButtonStyle = feedbackSent == null ? "p-1 rounded hover:bg-highlight-tone bg-transparent" : "p-1 rounded pointer-events-none";
  
  return (
    <div className="w-full flex flex-row justify-end gap-2">
      <Button onClick={() => sendFeedback(true)}
        className={`${feedbackButtonStyle} ${feedbackSent == true && "bg-highlight-tone brightness-150"}`}>
        <Image className="brightness-200" src="images/thumbUp.svg" alt="thumbs up feedback icon" width={24}
          height={24}/>
      </Button>
      
      <Button onClick={() => sendFeedback(false)}
        className={`${feedbackButtonStyle} ${feedbackSent == false && "bg-highlight-tone brightness-150"}`}>
        <Image src="images/thumbDown.svg" alt="thumbs up feedback icon" width={24} height={24}/>
      </Button>
    </div>
  )
}