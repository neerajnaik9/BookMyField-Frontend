package com.bookmyfield.BookMyFieldBackend.controller;

import com.bookmyfield.BookMyFieldBackend.model.Field;
import com.bookmyfield.BookMyFieldBackend.service.FieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fields")
public class FieldController {

    @Autowired
    private FieldService fieldService;

    @PostMapping
    public ResponseEntity<?> addField(@RequestBody Field field, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            System.out.println("📥 Received Field Data: " + field);

            if (field.getBase64Image() != null) {
                System.out.println("✅ Image Data Detected...");
                field.setBase64Image(field.getBase64Image()); // ✅ Convert to byte[] automatically
            }

            Field savedField = fieldService.addField(field, userDetails.getUsername());
            System.out.println("✅ Field Saved Successfully: " + savedField);

            return ResponseEntity.ok(savedField);
        } catch (IllegalArgumentException e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("🚨 Invalid Base64 format: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("🚨 Error saving field: " + e.getMessage());
        }
    }

    @GetMapping("/my-fields")
    public ResponseEntity<List<Field>> getMyFields(@AuthenticationPrincipal UserDetails userDetails) {
        List<Field> fields = fieldService.getFieldsByOwner(userDetails.getUsername());
        return ResponseEntity.ok(fields);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateField(@PathVariable Long id, @RequestBody Field field, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Field updatedField = fieldService.updateField(id, field, userDetails.getUsername());
            return ResponseEntity.ok(updatedField);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating field: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFieldById(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Optional<Field> field = fieldService.getFieldById(id);
        if (field.isPresent() && field.get().getOwner().getEmail().equals(userDetails.getUsername())) {
            return ResponseEntity.ok(field.get());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized or Field Not Found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteField(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            fieldService.deleteField(id, userDetails.getUsername());
            return ResponseEntity.ok("Field deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized: " + e.getMessage());
        }
    }

    // ✅ Updated this to fetch **all approval statuses** (Pending, Approved, Rejected)
    @GetMapping("/my-approvals")
    public ResponseEntity<List<Field>> getMyApprovals(@AuthenticationPrincipal UserDetails userDetails) {
        List<Field> approvals = fieldService.getApprovalsByOwner(userDetails.getUsername());
        return ResponseEntity.ok(approvals);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<String> getFieldImage(@PathVariable Long id) {
        Optional<Field> field = fieldService.getFieldById(id);
        if (field.isPresent() && field.get().getImage() != null) {
            String base64Image = Base64.getEncoder().encodeToString(field.get().getImage());
            return ResponseEntity.ok("data:image/jpeg;base64," + base64Image);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No image found for this field.");
    }
}
