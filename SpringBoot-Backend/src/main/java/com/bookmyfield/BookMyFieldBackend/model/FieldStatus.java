package com.bookmyfield.BookMyFieldBackend.model;

public enum FieldStatus {
    PENDING, APPROVED, REJECTED;

    // Getter Method
    public String getStatus() {
        return this.name();
    }
}
