package com.bookmyfield.BookMyFieldBackend.controller;

import com.bookmyfield.BookMyFieldBackend.dto.SignupRequest;
import com.bookmyfield.BookMyFieldBackend.dto.AuthResponse;
import com.bookmyfield.BookMyFieldBackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok(userService.registerUser(signupRequest)); // ✅ Return AuthResponse with token
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(userService.loginUser(request)); // ✅ Ensure login returns a JWT token
    }
}
