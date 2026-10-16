import { I18nProvider } from "@/components/i18n-provider";
import type { Lang } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import "@/app/globals.css";

/** Корневой документ: у русской и казахской версий свой корневой layout, поэтому <html lang> разный. */
export function RootDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html
      lang={lang}
      className="dark bg-background"
      suppressHydrationWarning
    >
      <body className="antialiased font-sans" suppressHydrationWarning>
        <I18nProvider lang={lang} dictionary={getDictionary(lang)}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
