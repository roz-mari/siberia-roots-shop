package com.siberiaroots.shop.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {
    public record RegisterRequest(
            @NotBlank @Email @Size(max = 200) String email,
            @NotBlank @Size(min = 6, max = 100) String password
    ) {}

    public record LoginRequest(
            @NotBlank @Email @Size(max = 200) String email,
            @NotBlank @Size(min = 6, max = 100) String password
    ) {}

    public record AuthResponse(String token) {}
}


