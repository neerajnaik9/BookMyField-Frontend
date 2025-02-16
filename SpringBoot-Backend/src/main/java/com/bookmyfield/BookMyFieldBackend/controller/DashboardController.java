package com.bookmyfield.BookMyFieldBackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DashboardController {

    // Protected endpoint for Customers
    @GetMapping("/customer/dashboard")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> customerDashboard() {
        return ResponseEntity.ok().body("{\"message\": \"Welcome to the Customer Dashboard!\"}");
    }

    // Protected endpoint for Field Owners
    @GetMapping("/field-owner/dashboard")
    @PreAuthorize("hasAuthority('FIELD_OWNER')")
    public ResponseEntity<?> fieldOwnerDashboard() {
        return ResponseEntity.ok().body("{\"message\": \"Welcome to the Field Owner Dashboard!\"}");
    }

    // Protected endpoint for Admins
    @GetMapping("/admin/dashboard")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> adminDashboard() {
        return ResponseEntity.ok().body("{\"message\": \"Welcome to the Admin Dashboard!\"}");
    }
}
