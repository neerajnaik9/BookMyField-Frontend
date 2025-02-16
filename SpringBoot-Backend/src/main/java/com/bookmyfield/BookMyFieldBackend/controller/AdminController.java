package com.bookmyfield.BookMyFieldBackend.controller;

import com.bookmyfield.BookMyFieldBackend.model.Field;
import com.bookmyfield.BookMyFieldBackend.model.User;
import com.bookmyfield.BookMyFieldBackend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Fetch all registered Customers
    @GetMapping("/customers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllCustomers() {
        return adminService.getAllCustomers();
    }

    // Fetch all registered Turf Owners
    @GetMapping("/turf-owners")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllTurfOwners() {
        return adminService.getAllTurfOwners();
    }

    // Fetch all Pending Fields (for approval)
    @GetMapping("/pending-fields")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Field> getPendingFields() {
        return adminService.getPendingFields();
    }

    // ✅ Fetch all fields of a Turf Owner (for tracking approval status)
    @GetMapping("/fields-by-owner")
    @PreAuthorize("hasRole('FIELD_OWNER')")
    public List<Field> getFieldsByOwner(@RequestParam String ownerEmail) {
        return adminService.getFieldsByOwner(ownerEmail);
    }

    // ✅ Approve a Field & Notify Owner
    @PutMapping("/approve-field/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String approveField(@PathVariable Long id) {
        return adminService.approveField(id);
    }

    // ✅ Reject a Field & Notify Owner
    @PutMapping("/reject-field/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String rejectField(@PathVariable Long id) {
        return adminService.rejectField(id);
    }
}
