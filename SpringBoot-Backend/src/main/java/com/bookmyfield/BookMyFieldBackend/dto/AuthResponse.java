package com.bookmyfield.BookMyFieldBackend.dto;

public class AuthResponse {

    private String token;    // For both signup and login
    private String role;     // For both signup and login

    // Constructor for both signup and login
    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    // Setters
    public void setToken(String token) {
        this.token = token;
    }

    public void setRole(String role) {
        this.role = role;
    }
}