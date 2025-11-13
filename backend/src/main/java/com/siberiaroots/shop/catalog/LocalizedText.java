package com.siberiaroots.shop.catalog;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Localized text in Russian and English")
public record LocalizedText(
        @Schema(description = "Russian translation", example = "Классическая матрёшка")
        String ru,
        @Schema(description = "English translation", example = "Classic Matryoshka")
        String en
) {
}


