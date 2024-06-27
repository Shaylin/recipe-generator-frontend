import Link from "next/link";
import { JSX } from "react";

export default function WideNavMenu({className}: { className: string }): JSX.Element {
  return (
    <nav className={`${className} flex-row justify-evenly items-center w-128 text-lg`}>
      <Link href="/sweets">
        <p className="text-white hover:text-bright-tone hover:underline">Project Info</p>
      </Link>
      <Link href="/savouries">
        <p className="text-white hover:text-bright-tone hover:underline">Other Info</p>
      </Link>
    </nav>
  )
}