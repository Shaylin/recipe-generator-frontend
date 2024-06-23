import { Fragment } from "react";
import CompactNavMenu from "@/components/compactNavMenu/compactNavMenu";
import WideNavMenu from "@/components/wideNavMenu/wideNavMenu";

export default function ResponsiveNavMenu() {
  return (
    <Fragment>
      <CompactNavMenu className="sm:hidden block"/>
      <WideNavMenu className="sm:flex hidden"/>
    </Fragment>
  )
}
