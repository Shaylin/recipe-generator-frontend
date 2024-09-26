"use client"

import React, { JSX } from "react";
import InstructionsCard from "@/components/instructionsCard/instructionsCard";

export default function RecipeGenerator(): JSX.Element {
  return (
    <div
      className="flex flex-col items-center justify-around max-w-screen-lg min-h-96 sm:w-10/12 w-full bg-light-tone p-6 rounded-xl shadow gap-8">
      <InstructionsCard/>
    </div>
  )
}