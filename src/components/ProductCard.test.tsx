import { render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProductCard from "./ProductCard";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import type { Product } from "@/types/product";
import { classicMatryoshka, taigaHoney } from "@/test/fixtures";

type Lang = "ru" | "en" | "es";

function SetLanguage({ lang }: { lang: Lang }) {
  const { setLanguage } = useLanguage();
  useEffect(() => setLanguage(lang), [lang, setLanguage]);
  return null;
}

function renderCard(product: Product, lang: Lang = "ru") {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <SetLanguage lang={lang} />
        <ProductCard product={product} />
      </LanguageProvider>
    </MemoryRouter>,
  );
}

describe("ProductCard", () => {
  it("shows the name, category and price in Russian by default", () => {
    renderCard(classicMatryoshka);
    expect(screen.getByRole("heading", { name: "Классическая матрёшка" })).toBeInTheDocument();
    expect(screen.getByText("Классика")).toBeInTheDocument();
    expect(screen.getByText("$45.00")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Подробнее" })).toHaveAttribute(
      "href",
      "/products/classic-1",
    );
  });

  it("shows Spanish content when the language is Spanish", () => {
    renderCard(classicMatryoshka, "es");
    expect(screen.getByRole("heading", { name: "Matrioska clásica" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver detalles" })).toBeInTheDocument();
  });

  it("falls back to English when a product has no Spanish translation", () => {
    renderCard(taigaHoney, "es");
    expect(screen.getByRole("heading", { name: "Taiga Honey" })).toBeInTheDocument();
    expect(screen.getByText("$12.50")).toBeInTheDocument();
  });

  it("uses the product name as the image alt text", () => {
    renderCard(classicMatryoshka, "en");
    expect(screen.getByRole("img", { name: "Classic Matryoshka" })).toBeInTheDocument();
  });
});
