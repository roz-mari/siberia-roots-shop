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
                    new LocalizedText("Классическая матрёшка", "Classic Matryoshka", "Matrioska clásica"),
                    new LocalizedText("Традиционная роспись, 7 фигур", "Traditional painting, set of 7 dolls", "Pintura tradicional, juego de 7 muñecas"),
                    new BigDecimal("35.00"),
                    "classic-matryoshka",
                    new LocalizedText("Классические", "Classic", "Clásicas")
            ),
            new Product(
                    "2",
                    new LocalizedText("Сибирская матрёшка", "Siberian Matryoshka", "Matrioska siberiana"),
                    new LocalizedText("Вдохновлена сибирскими узорами и природой", "Inspired by Siberian patterns and nature", "Inspirada en los patrones y la naturaleza de Siberia"),
                    new BigDecimal("42.00"),
                    "siberian-matryoshka",
                    new LocalizedText("Тематические", "Themed", "Temáticas")
            ),
            new Product(
                    "3",
                    new LocalizedText("Современная матрёшка", "Modern Matryoshka", "Matrioska moderna"),
                    new LocalizedText("Минималистичный дизайн, яркие цвета", "Minimalist design with bright colors", "Diseño minimalista con colores vivos"),
                    new BigDecimal("29.90"),
                    "modern-matryoshka",
                    new LocalizedText("Современные", "Modern", "Modernas")
            ),
            new Product(
                    "4",
                    new LocalizedText("Матрешка \"Новосибирск\"", "\"Novosibirsk\" Matryoshka", "Matrioska «Novosibirsk»"),
                    new LocalizedText("Тематический набор с символами города", "Themed set with Novosibirsk landmarks", "Conjunto temático con símbolos de Novosibirsk"),
                    new BigDecimal("39.00"),
                    "novosibirsk-matryoshka",
                    new LocalizedText("Тематические", "Themed", "Temáticas")
            ),
            new Product(
                    "5",
                    new LocalizedText("Матрешка-подарочный набор", "Gift Matryoshka Set", "Juego de regalo Matrioska"),
                    new LocalizedText("Подарочная коробка, открытка и матрёшка", "Gift box, postcard and matryoshka doll", "Caja de regalo, postal y muñeca matrioska"),
                    new BigDecimal("49.00"),
                    "gift-matryoshka",
                    new LocalizedText("Подарочные наборы", "Gift Sets", "Sets de regalo")
            ),
            new Product(
                    "6",
                    new LocalizedText("Набор мини-матрёшек", "Mini Matryoshka Set", "Juego de mini matrioskas"),
                    new LocalizedText("Маленькие фигурки для декора", "Small decorative matryoshka set", "Pequeñas figuras decorativas"),
                    new BigDecimal("24.50"),
                    "mini-matryoshka",
                    new LocalizedText("Мини", "Mini", "Mini")
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


