import Link from "next/link";

export default function NavMenu() {
    //TODO: Placeholder for now
    return (
        <nav className={"flex flex-row justify-evenly items-center w-128 text-lg"}>
            <Link href="/sweets">
                <p className="text-primary-light hover:text-secondary-light hover:underline">Project Info</p>
            </Link>
            <Link href="/savouries">
                <p className="text-primary-light hover:text-secondary-light hover:underline">Other Info</p>
            </Link>
        </nav>
    )
}