package com.siberiaroots.shop.catalog;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@DisplayName("ProductService")
class ProductServiceTest {

    private ProductCatalog catalog;
    private ProductService service;

    @BeforeEach
    void setUp() {
        catalog = mock(ProductCatalog.class);
        service = new ProductService(catalog);
    }

    @Nested
    @DisplayName("getProducts()")
    class GetProducts {

        @Test
        void returnsAllProductsFromCatalog() {
            List<Product> expected = List.of(
                    new Product("1", new LocalizedText("Test", "Test", "Test"), new LocalizedText("Desc", "Desc", "Desc"),
                            new java.math.BigDecimal("10.00"), "test-key", new LocalizedText("Cat", "Cat", "Cat"))
            );
            when(catalog.findAll()).thenReturn(expected);

            List<Product> result = service.getProducts();

            assertThat(result).isEqualTo(expected);
            verify(catalog).findAll();
        }
    }

    @Nested
    @DisplayName("getProduct(String id)")
    class GetProduct {

        @Test
        void returnsProductWhenExists() {
            Product product = new Product("1", new LocalizedText("Test", "Test", "Test"), new LocalizedText("Desc", "Desc", "Desc"),
                    new java.math.BigDecimal("10.00"), "test-key", new LocalizedText("Cat", "Cat", "Cat"));
            when(catalog.findById("1")).thenReturn(Optional.of(product));

            Product result = service.getProduct("1");

            assertThat(result).isEqualTo(product);
            verify(catalog).findById("1");
        }

        @Test
        void throwsProductNotFoundExceptionWhenNotFound() {
            when(catalog.findById("999")).thenReturn(Optional.empty());

            assertThatThrownBy(() -> service.getProduct("999"))
                    .isInstanceOf(ProductNotFoundException.class)
                    .hasMessageContaining("999");
            verify(catalog).findById("999");
        }
    }
}

