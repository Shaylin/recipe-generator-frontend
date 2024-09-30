import { JSX } from "react";
import { redirect } from "next/navigation";

export default function RecipeGenerator(): JSX.Element {
  redirect("https://huggingface.co/spaces/Ashikan/dut-recipe-generator");
}