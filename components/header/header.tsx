import BrandLogo from "@/components/brandLogo/brandLogo";
import ResponsiveNavMenu from "@/components/responsiveNavMenu/responsiveNavMenu";

export default function Header() {
  return (
    <header
      className="fixed flex flex-col justify-center items-center w-full h-24 top-0 bg-dark-tone drop-shadow-md z-50">
      <div className="flex flex-row justify-between items-center grow max-w-screen-lg my-2 mx-4 gap-12">
        <BrandLogo/>
        <ResponsiveNavMenu/>
      </div>
    </header>
  )
}