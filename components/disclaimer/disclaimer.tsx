import { JSX, useState } from "react";

export default function Disclaimer(): JSX.Element {
  return (
    <div className="text-center text-sm w-10/12">
      This recipe was generated by AI. It may contain inaccuracies or mistakes.
      Please verify the correctness of the recipe before attempting to prepare it.
    </div>
  )
}