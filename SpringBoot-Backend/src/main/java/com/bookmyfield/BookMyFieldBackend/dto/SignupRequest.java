package com.bookmyfield.BookMyFieldBackend.dto;

public class SignupRequest {
    
    private String username;
    private String email;
    private String mobile;
    private String customerName;
    private String password;
    private String role;

    // Constructor
    public SignupRequest() {}

    public SignupRequest(String username, String email, String mobile, String customerName, String password, String role) {
        this.username = username;
        this.email = email;
        this.mobile = mobile;
        this.customerName = customerName;
        this.password = password;
        this.role = role;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getMobile() {
        return mobile;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
