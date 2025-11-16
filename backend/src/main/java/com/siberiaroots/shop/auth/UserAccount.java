package com.siberiaroots.shop.auth;

public record UserAccount(
        String id,
        String email,
        String passwordHash,
        boolean verified,
        String verifyToken
) {}


