package com.siberiaroots.shop.exception;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

@Schema(description = "Error response structure")
public record ErrorResponse(
        @Schema(description = "HTTP status code", example = "400")
        int status,
        @Schema(description = "Error message", example = "Invalid request")
        String message,
        @Schema(description = "Error type/code", example = "VALIDATION_ERROR")
        String error,
        @Schema(description = "Timestamp of the error", example = "2024-01-01T12:00:00Z")
        Instant timestamp
) {
    public ErrorResponse(int status, String message, String error) {
        this(status, message, error, Instant.now());
    }
}

