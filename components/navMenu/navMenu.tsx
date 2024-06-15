import Link from "next/link";

export default function NavMenu() {
    //TODO: Placeholder for now
    return (
        <nav className={"flex flex-row justify-evenly items-center w-128 text-lg"}>
            <Link href="/sweets">
                <p className="text-primary-light hover:text-secondary-light hover:underline">Sweets</p>
            </Link>
            <Link href="/savouries">
                <p className="text-primary-light hover:text-secondary-light hover:underline">Savouries</p>
            </Link>
            <Link href="/delivery">
                <p className="text-primary-light hover:text-secondary-light hover:underline">Delivery Info</p>
            </Link>
        </nav>
    )
}