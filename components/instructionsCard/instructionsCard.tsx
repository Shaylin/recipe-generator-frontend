import React, { JSX } from "react";
import { Divider } from "@nextui-org/divider";

export default function InstructionsCard(): JSX.Element {
  return (
    <div className="text-center flex flex-col gap-1">
      <p className="text-xl font-bold">An AI Model Attempting To Generate Healthier, Diabetic-Friendly Recipes.</p>
      <Divider/>
      <p className="text-lg font-bold">Start by entering two or more ingredients below:</p>
    </div>
  );
}