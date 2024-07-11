import Image from "next/image";
import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link href="/">
      <Image alt="DUT Logo" src="/images/DUTLogo.png" width={173} height={100} className="min-w-20"/>
    </Link>
  );
}