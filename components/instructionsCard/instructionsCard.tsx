import React, { JSX } from "react";
import { Divider } from "@nextui-org/divider";

export default function InstructionsCard(): JSX.Element {
  return (
    <div className="text-center flex flex-col gap-1">
      <p className="text-xl font-bold">This site has been deprecated. </p>
      <Divider/>
      <p className="text-lg font-bold">Instead visit: https://huggingface.co/spaces/Ashikan/dut-recipe-generator</p>
    </div>
  );
}