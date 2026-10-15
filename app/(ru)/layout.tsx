import { RootDocument } from "@/components/root-document";
import { rootMetadata, rootViewport } from "@/lib/i18n/layout-config";

export const metadata = rootMetadata("ru");
export const viewport = rootViewport;

export default function RuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument lang="ru">{children}</RootDocument>;
}
