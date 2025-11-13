package com.siberiaroots.shop.catalog;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;

@Schema(description = "Product available in the Siberia Roots catalog")
public record Product(
        @Schema(example = "1")
        String id,
        LocalizedText name,
        LocalizedText description,
        @Schema(example = "35.00")
        BigDecimal price,
        @Schema(description = "Key to resolve product image on the frontend", example = "classic-matryoshka")
        String imageKey,
        LocalizedText category
) {
}


