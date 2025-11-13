package com.siberiaroots.shop.catalog;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Component
public class ProductCatalog {

    private final List<Product> products = List.of(
            new Product(
                    "1",
                    new LocalizedText("Классическая матрёшка", "Classic Matryoshka"),
                    new LocalizedText("Традиционная роспись, 7 фигур", "Traditional painting, set of 7 dolls"),
                    new BigDecimal("35.00"),
                    "classic-matryoshka",
                    new LocalizedText("Классические", "Classic")
            ),
            new Product(
                    "2",
                    new LocalizedText("Сибирская матрёшка", "Siberian Matryoshka"),
                    new LocalizedText("Вдохновлена сибирскими узорами и природой", "Inspired by Siberian patterns and nature"),
                    new BigDecimal("42.00"),
                    "siberian-matryoshka",
                    new LocalizedText("Тематические", "Themed")
            ),
            new Product(
                    "3",
                    new LocalizedText("Современная матрёшка", "Modern Matryoshka"),
                    new LocalizedText("Минималистичный дизайн, яркие цвета", "Minimalist design with bright colors"),
                    new BigDecimal("29.90"),
                    "modern-matryoshka",
                    new LocalizedText("Современные", "Modern")
            ),
            new Product(
                    "4",
                    new LocalizedText("Матрешка \"Новосибирск\"", "\"Novosibirsk\" Matryoshka"),
                    new LocalizedText("Тематический набор с символами города", "Themed set with Novosibirsk landmarks"),
                    new BigDecimal("39.00"),
                    "novosibirsk-matryoshka",
                    new LocalizedText("Тематические", "Themed")
            ),
            new Product(
                    "5",
                    new LocalizedText("Матрешка-подарочный набор", "Gift Matryoshka Set"),
                    new LocalizedText("Подарочная коробка, открытка и матрёшка", "Gift box, postcard and matryoshka doll"),
                    new BigDecimal("49.00"),
                    "gift-matryoshka",
                    new LocalizedText("Подарочные наборы", "Gift Sets")
            ),
            new Product(
                    "6",
                    new LocalizedText("Набор мини-матрёшек", "Mini Matryoshka Set"),
                    new LocalizedText("Маленькие фигурки для декора", "Small decorative matryoshka set"),
                    new BigDecimal("24.50"),
                    "mini-matryoshka",
                    new LocalizedText("Мини", "Mini")
            )
    );

    public List<Product> findAll() {
        return products;
    }

    public Optional<Product> findById(String id) {
        return products.stream()
                .filter(product -> product.id().equals(id))
                .findFirst();
    }
}


