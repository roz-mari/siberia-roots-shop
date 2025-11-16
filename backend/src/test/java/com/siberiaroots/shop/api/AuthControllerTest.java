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

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    @DisplayName("POST /api/auth/register")
    class Register {

        @Test
        void registersNewUserAndReturnsToken() throws Exception {
            String email = "test" + System.currentTimeMillis() + "@example.com";
            String requestBody = objectMapper.writeValueAsString(new RegisterRequest(email, "password123"));

            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.token", notNullValue()));
        }

        @Test
        void returns409ForDuplicateEmail() throws Exception {
            String email = "duplicate" + System.currentTimeMillis() + "@example.com";
            String requestBody = objectMapper.writeValueAsString(new RegisterRequest(email, "password123"));

            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk());

            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isConflict())
                    .andExpect(jsonPath("$.error", is("EMAIL_ALREADY_EXISTS")));
        }

        @Test
        void returns400ForInvalidRequest() throws Exception {
            String requestBody = objectMapper.writeValueAsString(new RegisterRequest("", "short"));

            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error", is("VALIDATION_ERROR")));
        }
    }

    @Nested
    @DisplayName("POST /api/auth/login")
    class Login {

        @Test
        void logsInWithValidCredentials() throws Exception {
            String email = "login" + System.currentTimeMillis() + "@example.com";
            String password = "password123";

            // Register first
            String registerBody = objectMapper.writeValueAsString(new RegisterRequest(email, password));
            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(registerBody))
                    .andExpect(status().isOk());

            // Login
            String loginBody = objectMapper.writeValueAsString(new LoginRequest(email, password));
            mockMvc.perform(post("/api/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(loginBody))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.token", notNullValue()));
        }

        @Test
        void returns401ForInvalidCredentials() throws Exception {
            String loginBody = objectMapper.writeValueAsString(new LoginRequest("unknown@example.com", "wrongpass"));

            mockMvc.perform(post("/api/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(loginBody))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.error", is("INVALID_CREDENTIALS")));
        }
    }

    @Nested
    @DisplayName("GET /api/auth/verify")
    class Verify {

        @Test
        void returns400ForInvalidToken() throws Exception {
            mockMvc.perform(get("/api/auth/verify")
                            .param("token", "invalid-token"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error", is("INVALID_TOKEN")));
        }

        @Test
        void returns400ForNonExistentToken() throws Exception {
            // This test requires email verification enabled, which is disabled by default
            // In a real scenario, you'd need to extract the verify token from the registration response
            // For now, we test the error case
            mockMvc.perform(get("/api/auth/verify")
                            .param("token", "non-existent-token"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error", is("INVALID_TOKEN")));
        }
    }

    // Inner classes for request DTOs (matching AuthDtos.java structure)
    private record RegisterRequest(String email, String password) {}
    private record LoginRequest(String email, String password) {}
}

