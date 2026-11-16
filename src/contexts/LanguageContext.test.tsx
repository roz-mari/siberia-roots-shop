import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { LanguageProvider, useLanguage } from "./LanguageContext";

const wrapper = ({ children }: { children: ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe("LanguageContext", () => {
  it("uses Russian by default", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe("ru");
    expect(result.current.t("Привет", "Hello", "Hola")).toBe("Привет");
  });

  it("switches to English and Spanish", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLanguage("en"));
    expect(result.current.t("Привет", "Hello", "Hola")).toBe("Hello");
    act(() => result.current.setLanguage("es"));
    expect(result.current.t("Привет", "Hello", "Hola")).toBe("Hola");
  });

  it("falls back to English when a Spanish string is missing", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLanguage("es"));
    expect(result.current.t("Привет", "Hello")).toBe("Hello");
  });

  it("throws a clear error when used outside the provider", () => {
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useLanguage())).toThrow(
      "useLanguage must be used within a LanguageProvider",
    );
    silence.mockRestore();
  });
});
