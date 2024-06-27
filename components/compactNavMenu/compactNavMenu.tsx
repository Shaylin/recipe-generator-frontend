"use client"

import { Transition } from "@headlessui/react";
import { JSX, useState } from "react";
import Link from "next/link";

export default function CompactNavMenu({ className }: { className: string }): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  }
  
  return (
    <div className={`${className} flex flex-row justify-center`}>
      <button onClick={handleExpand}
        className={`h-8 w-8 duration-150 rounded-sm ${isExpanded ? "bg-highlight-tone" : ""}`}>
        {getNavMenuIcon()}
      </button>
      <Transition
        show={isExpanded}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <nav
          className="fixed flex gap-1 flex-col items-center bg-highlight-tone w-full left-0 top-24 p-2 text-lg">
          <Link href="/sweets">
            <p className="text-white hover:text-bright-tone hover:underline">Project Info</p>
          </Link>
          <Link href="/savouries">
            <p className="text-white hover:text-bright-tone hover:underline">Other Info</p>
          </Link>
        </nav>
      </Transition>
    </div>
  )
}

function getNavMenuIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f6f6f0"
      className={"w-8 h-8 duration-150 hover:stroke-secondary-light"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
    </svg>
  )
}