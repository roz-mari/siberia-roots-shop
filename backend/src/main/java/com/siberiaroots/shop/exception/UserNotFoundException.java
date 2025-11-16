package com.siberiaroots.shop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserNotFoundException extends ResponseStatusException {
    public UserNotFoundException(String identifier) {
        super(HttpStatus.NOT_FOUND, "User not found: %s".formatted(identifier));
    }
}

