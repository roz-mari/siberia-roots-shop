package com.siberiaroots.shop.catalog;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ProductService {

    private final ProductCatalog productCatalog;

    public ProductService(ProductCatalog productCatalog) {
        this.productCatalog = productCatalog;
    }

    public List<Product> getProducts() {
        return productCatalog.findAll();
    }

    public List<Product> getProducts(String category, BigDecimal minPrice, BigDecimal maxPrice) {
        Stream<Product> stream = productCatalog.findAll().stream();
        
        if (category != null && !category.isBlank()) {
            stream = stream.filter(p -> 
                p.category().en().equalsIgnoreCase(category) ||
                p.category().ru().equalsIgnoreCase(category) ||
                (p.category().es() != null && p.category().es().equalsIgnoreCase(category))
            );
        }
        
        if (minPrice != null) {
            stream = stream.filter(p -> p.price().compareTo(minPrice) >= 0);
        }
        
        if (maxPrice != null) {
            stream = stream.filter(p -> p.price().compareTo(maxPrice) <= 0);
        }
        
        return stream.toList();
    }

    public Product getProduct(String id) {
        return productCatalog.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }
}


