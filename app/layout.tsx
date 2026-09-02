import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-jetbrains-mono",
});

const basePath = process.env.NODE_ENV === "production" ? "/CNC2Plus-milling-services" : "";

export const metadata: Metadata = {
  title: "CNC++ - Фрезерная резка ЧПУ по дереву",
  description:
    "CNC++ - фрезерная резка и гравировка по дереву на ЧПУ станках. Мебельные детали, декор, вывески, интерьерные панели на заказ. Оставьте заявку и получите расчёт.",
  icons: {
    icon: `${basePath}/images/icon.svg`,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#12100e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`dark bg-background ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
