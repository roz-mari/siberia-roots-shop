package com.siberiaroots.shop.api;

import com.siberiaroots.shop.auth.AuthDtos.AuthResponse;
import com.siberiaroots.shop.auth.AuthDtos.LoginRequest;
import com.siberiaroots.shop.auth.AuthDtos.RegisterRequest;
import com.siberiaroots.shop.auth.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Auth", description = "Registration and login (in-memory demo)")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Register new user and receive token")
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
        String token = authService.register(req.email(), req.password());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @Operation(summary = "Login and receive token")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        String token = authService.login(req.email(), req.password());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @Operation(summary = "Verify email by token")
    @GetMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam("token") String token) {
        authService.verify(token);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "text/plain; charset=UTF-8");
        return new ResponseEntity<>("Email verified. You can close this page.", headers, HttpStatus.OK);
    }
}


