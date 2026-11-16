import { describe, expect, it } from "vitest";
import { dateLocale, localize } from "./i18n";

const withSpanish = { ru: "Мёд", en: "Honey", es: "Miel" };
const withoutSpanish = { ru: "Мёд", en: "Honey" };

describe("localize", () => {
  it("returns the text for the selected language", () => {
    expect(localize(withSpanish, "ru")).toBe("Мёд");
    expect(localize(withSpanish, "en")).toBe("Honey");
    expect(localize(withSpanish, "es")).toBe("Miel");
  });

  it("falls back to English when Spanish is missing", () => {
    expect(localize(withoutSpanish, "es")).toBe("Honey");
  });
});

describe("dateLocale", () => {
  it("maps every language to a date locale", () => {
    expect(dateLocale).toEqual({ ru: "ru-RU", en: "en-US", es: "es-ES" });
  });
});
