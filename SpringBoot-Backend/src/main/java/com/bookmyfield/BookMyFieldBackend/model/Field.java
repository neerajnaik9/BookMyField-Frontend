package com.bookmyfield.BookMyFieldBackend.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Base64;
import java.util.List;

@Entity
@Table(name = "fields")
public class Field {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    @Lob
    private String description;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String timings; // Store as JSON String

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private String category;

    @Lob // ✅ Ensure LONGBLOB storage for image
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @Column(nullable = false)
    private String status = "Pending"; // Default status for admin approval

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
    
   

    @Transient // ✅ Not stored in DB
    private String base64Image; // ✅ Holds Base64 string for API

    // ✅ Getter for API request handling
    public String getBase64Image() {
        return this.image != null ? Base64.getEncoder().encodeToString(this.image) : null;
    }

    // ✅ Setter to accept Base64 data before converting to byte[]
    public void setBase64Image(String base64Image) {
        if (base64Image != null && base64Image.contains(",")) {
            base64Image = base64Image.substring(base64Image.indexOf(",") + 1); // ✅ Remove metadata
        }
        try {
            this.image = Base64.getDecoder().decode(base64Image);
        } catch (IllegalArgumentException e) {
            System.err.println("🚨 Invalid Base64 format: " + e.getMessage());
            this.image = null;
        }
    }


    // ✅ Constructors
    public Field() {}

    public Field(Long id, String name, String location, String description, List<String> timings,
                 double price, String category, byte[] image, String status, User owner) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = description;
        this.setTimings(timings); // Convert to JSON String
        this.price = price;
        this.category = category;
        this.image = image;
        this.status = status;
        this.owner = owner;
    }

    // ✅ Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // ✅ Convert JSON String to List<String>
    public List<String> getTimings() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(this.timings, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return null;
        }
    }

    // ✅ Convert List<String> to JSON String
    public void setTimings(List<String> timings) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            this.timings = objectMapper.writeValueAsString(timings);
        } catch (Exception e) {
            this.timings = null;
        }
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
