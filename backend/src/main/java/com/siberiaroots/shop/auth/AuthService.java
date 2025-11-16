package com.siberiaroots.shop.auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();
    private final Map<String, UserAccount> emailToUser = new ConcurrentHashMap<>();
    private final Map<String, String> tokenToUserId = new ConcurrentHashMap<>();

    public String register(String email, String rawPassword) {
        if (emailToUser.containsKey(email)) {
            throw new IllegalArgumentException("Email already registered");
        }
        String id = UUID.randomUUID().toString();
        String hash = encoder.encode(rawPassword);
        UserAccount user = new UserAccount(id, email, hash);
        emailToUser.put(email, user);
        return issueToken(user);
    }

    public String login(String email, String rawPassword) {
        UserAccount user = emailToUser.get(email);
        if (user == null || !encoder.matches(rawPassword, user.passwordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return issueToken(user);
    }

    private String issueToken(UserAccount user) {
        String token = UUID.randomUUID().toString();
        tokenToUserId.put(token, user.id());
        return token;
    }
}


