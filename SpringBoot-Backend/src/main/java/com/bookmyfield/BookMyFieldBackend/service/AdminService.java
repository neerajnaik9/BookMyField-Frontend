package com.bookmyfield.BookMyFieldBackend.service;

import com.bookmyfield.BookMyFieldBackend.model.Field;
import com.bookmyfield.BookMyFieldBackend.model.User;
import com.bookmyfield.BookMyFieldBackend.model.Role;
import com.bookmyfield.BookMyFieldBackend.repository.FieldRepository;
import com.bookmyfield.BookMyFieldBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FieldRepository fieldRepository;

    // Fetch all Customers
    public List<User> getAllCustomers() {
        return userRepository.findByRole(Role.CUSTOMER);
    }

    // Fetch all Turf Owners
    public List<User> getAllTurfOwners() {
        return userRepository.findByRole(Role.FIELD_OWNER);
    }

    // Fetch all Pending Fields
    public List<Field> getPendingFields() {
        return fieldRepository.findByStatus("Pending");
    }

    // ✅ Fetch Fields by Owner (for approval status tracking)
    public List<Field> getFieldsByOwner(String ownerEmail) {
        Optional<User> owner = userRepository.findByEmail(ownerEmail);
        return owner.map(fieldRepository::findByOwner).orElseThrow(() -> new RuntimeException("Owner not found"));
    }

    // ✅ Approve a Field & Ensure Owner Sees Updated Status
    public String approveField(Long id) {
        Optional<Field> fieldOptional = fieldRepository.findById(id);
        if (fieldOptional.isPresent()) {
            Field field = fieldOptional.get();
            field.setStatus("Approved");
            fieldRepository.save(field);
            return "✅ Field Approved Successfully!";
        }
        return "🚨 Field Not Found!";
    }

    // ✅ Reject a Field & Ensure Owner Sees Updated Status
    public String rejectField(Long id) {
        Optional<Field> fieldOptional = fieldRepository.findById(id);
        if (fieldOptional.isPresent()) {
            Field field = fieldOptional.get();
            field.setStatus("Rejected");
            fieldRepository.save(field);
            return "❌ Field Rejected Successfully!";
        }
        return "🚨 Field Not Found!";
    }
}
