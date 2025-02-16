package com.bookmyfield.BookMyFieldBackend.service;

import com.bookmyfield.BookMyFieldBackend.model.Field;
import com.bookmyfield.BookMyFieldBackend.model.User;
import com.bookmyfield.BookMyFieldBackend.repository.FieldRepository;
import com.bookmyfield.BookMyFieldBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FieldService {

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private UserRepository userRepository;

    public Field addField(Field field, String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("Assigning Field to Owner: " + owner.getEmail());

        field.setOwner(owner);
        field.setStatus("Pending");

        Field savedField = fieldRepository.save(field);
        System.out.println("Field Successfully Saved: " + savedField);

        return savedField;
    }

    public List<Field> getFieldsByOwner(String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return fieldRepository.findByOwner(owner);
    }

    public Field updateField(Long id, Field updatedField, String ownerEmail) {
        Field field = fieldRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Field not found"));

        if (!field.getOwner().getEmail().equals(ownerEmail)) {
            throw new RuntimeException("Unauthorized to update this field");
        }

        field.setName(updatedField.getName());
        field.setLocation(updatedField.getLocation());
        field.setDescription(updatedField.getDescription());
        field.setPrice(updatedField.getPrice());
        field.setCategory(updatedField.getCategory());
        field.setTimings(updatedField.getTimings());

        if (updatedField.getBase64Image() != null) {
            field.setBase64Image(updatedField.getBase64Image()); // ✅ Convert Base64 to byte[]
        }

        return fieldRepository.save(field);
    }

    public void deleteField(Long id, String ownerEmail) {
        Field field = fieldRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Field not found"));

        if (!field.getOwner().getEmail().equals(ownerEmail)) {
            throw new RuntimeException("Unauthorized to delete this field");
        }

        fieldRepository.delete(field);
    }

    public Optional<Field> getFieldById(Long id) {
        return fieldRepository.findById(id);
    }
    
 

    // ✅ Fetch all **fields owned by the Field Owner**, including Approved & Rejected ones
    public List<Field> getApprovalsByOwner(String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return fieldRepository.findByOwner(owner);
    }
}
