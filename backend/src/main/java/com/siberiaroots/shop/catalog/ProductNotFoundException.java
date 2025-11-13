package com.siberiaroots.shop.catalog;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

class ProductNotFoundException extends ResponseStatusException {

    ProductNotFoundException(String productId) {
        super(HttpStatus.NOT_FOUND, "Product with id %s not found".formatted(productId));
    }
}


