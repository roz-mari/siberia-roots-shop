package com.siberiaroots.shop.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private final Map<String, String> verifyTokenToEmail = new ConcurrentHashMap<>();

    private final JavaMailSender mailSender;
    private final String mailFrom;
    private final String appBaseUrl;

    public AuthService(JavaMailSender mailSender,
                       @Value("${app.mail.from:no-reply@siberia-roots.local}") String mailFrom,
                       @Value("${app.base-url:https://siberia-roots-shop.onrender.com}") String appBaseUrl) {
        this.mailSender = mailSender;
        this.mailFrom = mailFrom;
        this.appBaseUrl = appBaseUrl;
    }

    public String register(String email, String rawPassword) {
        if (emailToUser.containsKey(email)) {
            throw new IllegalArgumentException("Email already registered");
        }
        String id = UUID.randomUUID().toString();
        String hash = encoder.encode(rawPassword);
        String verifyToken = UUID.randomUUID().toString();
        UserAccount user = new UserAccount(id, email, hash, false, verifyToken);
        emailToUser.put(email, user);
        verifyTokenToEmail.put(verifyToken, email);
        sendVerificationEmail(email, verifyToken);
        return issueToken(user);
    }

    public String login(String email, String rawPassword) {
        UserAccount user = emailToUser.get(email);
        if (user == null || !encoder.matches(rawPassword, user.passwordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return issueToken(user);
    }

    public void verify(String token) {
        String email = verifyTokenToEmail.remove(token);
        if (email == null) throw new IllegalArgumentException("Invalid token");
        UserAccount u = emailToUser.get(email);
        if (u == null) throw new IllegalArgumentException("User not found");
        UserAccount verified = new UserAccount(u.id(), u.email(), u.passwordHash(), true, null);
        emailToUser.put(email, verified);
    }

    private String issueToken(UserAccount user) {
        String token = UUID.randomUUID().toString();
        tokenToUserId.put(token, user.id());
        return token;
    }

    private void sendVerificationEmail(String to, String token) {
        String link = appBaseUrl + "/api/auth/verify?token=" + token;
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(mailFrom);
        msg.setTo(to);
        msg.setSubject("Verify your email");
        msg.setText("Please confirm your email by clicking the link: " + link);
        mailSender.send(msg);
    }
}


