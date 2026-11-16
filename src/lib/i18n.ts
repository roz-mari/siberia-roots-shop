import type { LocalizedText } from "@/types/product";

export type Language = "ru" | "en" | "es";

/**
 * Picks the text for the current language.
 * Spanish is optional in the catalog, so it falls back to English when missing.
 */
export function localize(text: LocalizedText, language: Language): string {
  if (language === "es") return text.es ?? text.en;
  return text[language];
}

export const dateLocale: Record<Language, string> = {
  ru: "ru-RU",
  en: "en-US",
  es: "es-ES",
};
