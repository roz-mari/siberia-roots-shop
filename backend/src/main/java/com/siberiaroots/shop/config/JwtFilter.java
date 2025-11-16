package com.siberiaroots.shop.config;

import com.siberiaroots.shop.auth.AuthService;
import com.siberiaroots.shop.auth.UserAccount;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

public class JwtFilter extends OncePerRequestFilter {
    private final AuthService authService;

    public JwtFilter(AuthService authService) {
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Optional<UserAccount> user = authService.validateToken(token);
            if (user.isPresent()) {
                request.setAttribute("userId", user.get().id());
                request.setAttribute("userEmail", user.get().email());
            }
        }
        filterChain.doFilter(request, response);
    }
}

