import { RootDocument } from "@/components/root-document";
import { rootMetadata, rootViewport } from "@/lib/i18n/layout-config";

export const metadata = rootMetadata("kk");
export const viewport = rootViewport;

export default function KkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument lang="kk">{children}</RootDocument>;
}
