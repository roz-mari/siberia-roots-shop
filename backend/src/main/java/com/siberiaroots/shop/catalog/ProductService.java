package com.siberiaroots.shop.catalog;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductCatalog productCatalog;

    public ProductService(ProductCatalog productCatalog) {
        this.productCatalog = productCatalog;
    }

    public List<Product> getProducts() {
        return productCatalog.findAll();
    }

    public Product getProduct(String id) {
        return productCatalog.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }
}


