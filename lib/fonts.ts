import localFont from "next/font/local";

// Шрифты лежат в проекте (app/fonts), а не тянутся с Google. Каждый набор знаков — отдельный файл с
// unicode-range, как в исходном CSS Google Fonts: браузер скачивает файл, только если в тексте есть его знаки.
// Preload выключен, чтобы шрифты не конкурировали с первой отрисовкой (font-display: swap).
// У «дополнительных» наборов нет своего fallback: в стеке они идут перед основным, поэтому запасной шрифт
// с подогнанными метриками берётся от основного набора, как у единого семейства Google Fonts.
// Значения нужно писать литералами: загрузчик шрифтов Next не принимает константы и spread.

const spaceGroteskLatin = localFont({
  src: "../app/fonts/space-grotesk-latin.woff2",
  weight: "300 700",
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
  variable: "--font-space-grotesk",
});

const spaceGroteskLatinExt = localFont({
  src: "../app/fonts/space-grotesk-latin-ext.woff2",
  weight: "300 700",
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF" }],
  adjustFontFallback: false,
  variable: "--font-space-grotesk-ext",
});

const jetbrainsMonoLatin = localFont({
  src: "../app/fonts/jetbrains-mono-latin.woff2",
  weight: "100 800",
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
  variable: "--font-jetbrains-mono",
});

const jetbrainsMonoCyrillicExt = localFont({
  src: "../app/fonts/jetbrains-mono-cyrillic-ext.woff2",
  weight: "100 800",
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F" }],
  adjustFontFallback: false,
  variable: "--font-jetbrains-mono-cyrillic-ext",
});

/** Классы с CSS-переменными шрифтов для <html>. */
export const fontVariables = [
  spaceGroteskLatin,
  spaceGroteskLatinExt,
  jetbrainsMonoLatin,
  jetbrainsMonoCyrillicExt,
]
  .map((font) => font.variable)
  .join(" ");
