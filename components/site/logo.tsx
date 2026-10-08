import Link from "next/link";
import { withBasePath } from "@/lib/base-path";
import { siteConfig } from "@/lib/site-config";

export function Logo() {
  return (
    <Link href="/" className="text-xl font-bold">
      <img
        src={withBasePath("/images/logo main.svg")}
        alt={siteConfig.name}
        className="w-50"
      />
    </Link>
  );
}
