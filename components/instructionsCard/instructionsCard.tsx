import React, { JSX } from "react";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";

export default function InstructionsCard(): JSX.Element {
  return (
    <div className="text-center flex flex-col gap-1">
      <p className="text-xl font-bold">This site has been deprecated. Instead visit: </p>
      <Divider/>
      <Link className="text-lg font-bold text-highlight-tone" href="https://huggingface.co/spaces/Ashikan/dut-recipe-generator">https://huggingface.co/spaces/Ashikan/dut-recipe-generator</Link>
    </div>
  );
}