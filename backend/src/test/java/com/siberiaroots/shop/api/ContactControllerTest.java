package com.siberiaroots.shop.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    @DisplayName("POST /api/contact")
    class SendContact {

        @Test
        void acceptsValidContactForm() throws Exception {
            String requestBody = objectMapper.writeValueAsString(new ContactRequest(
                    "John Doe",
                    "john@example.com",
                    "Hello, I'm interested in your products."
            ));

            mockMvc.perform(post("/api/contact")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(result -> {
                        int status = result.getResponse().getStatus();
                        assertThat(status == 204 || status == 202).isTrue();
                    });
            // Can be 204 (success) or 202 (accepted but SMTP failed in non-strict mode)
        }

        @Test
        void returns400ForInvalidRequest() throws Exception {
            String requestBody = objectMapper.writeValueAsString(new ContactRequest(
                    "",
                    "invalid-email",
                    ""
            ));

            mockMvc.perform(post("/api/contact")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isBadRequest());
        }

        @Test
        void returns400ForBlankEmail() throws Exception {
            String requestBody = objectMapper.writeValueAsString(new ContactRequest(
                    "Jane Doe",
                    "",
                    "Message without email"
            ));

            mockMvc.perform(post("/api/contact")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isBadRequest());
        }
    }

    // Inner class matching ContactRequest.java structure
    private record ContactRequest(String name, String email, String message) {}
}

