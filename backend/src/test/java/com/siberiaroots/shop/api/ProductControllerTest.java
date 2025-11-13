package com.siberiaroots.shop.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Nested
    @DisplayName("GET /api/products")
    class ListProducts {

        @Test
        void returnsAllProducts() throws Exception {
            mockMvc.perform(get("/api/products").accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$", hasSize(6)))
                    .andExpect(jsonPath("$[0].id", is("1")))
                    .andExpect(jsonPath("$[0].name.ru", containsString("матрёшка")));
        }
    }

    @Nested
    @DisplayName("GET /api/products/{id}")
    class GetProduct {

        @Test
        void returnsProduct() throws Exception {
            mockMvc.perform(get("/api/products/3").accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id", is("3")))
                    .andExpect(jsonPath("$.name.en", is("Modern Matryoshka")));
        }

        @Test
        void returns404ForUnknownProduct() throws Exception {
            mockMvc.perform(get("/api/products/999").accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNotFound());
        }
    }
}


