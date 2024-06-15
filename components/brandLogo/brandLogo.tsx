import Image from "next/image";
import Link from "next/link";

export default function BrandLogo() {
    return (
        <Link href="/">
            <Image alt="DUT Logo" src="/images/DUTLogo.png" width={286} height={66}
                   className="saturate-0 duration-150 brightness-110 hover:brightness-110 hover:saturate-100 hover:scale-105"/>
        </Link>
    );
}