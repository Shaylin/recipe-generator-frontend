import NavMenu from "@/components/navMenu/navMenu";
import BrandLogo from "@/components/brandLogo/brandLogo";

export default function Header() {
    return (
        <header
            className="fixed flex flex-col justify-center items-center w-full h-32 top-0 bg-header-accent drop-shadow-md">
            <div className="flex flex-row justify-between items-center grow max-w-screen-lg my-2 mx-4 gap-8">
                <BrandLogo/>
                <NavMenu/>
            </div>
        </header>
    )
}