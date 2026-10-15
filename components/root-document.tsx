import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/components/i18n-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Lang } from "@/lib/i18n";
import "@/app/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-jetbrains-mono",
});

/** Корневой документ: у русской и казахской версий свой корневой layout, поэтому <html lang> разный. */
export function RootDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html
      lang={lang}
      className={`dark bg-background ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans" suppressHydrationWarning>
        <I18nProvider lang={lang}>
          {children}
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
