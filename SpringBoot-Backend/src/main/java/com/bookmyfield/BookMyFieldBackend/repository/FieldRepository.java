package com.bookmyfield.BookMyFieldBackend.repository;

import com.bookmyfield.BookMyFieldBackend.model.Field;
import com.bookmyfield.BookMyFieldBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FieldRepository extends JpaRepository<Field, Long> {
    List<Field> findByOwner(User owner);
    List<Field> findByStatus(String status);

    // ✅ New method to fetch only pending fields for a specific owner
    List<Field> findByOwnerAndStatus(User owner, String status);
 // ✅ Fetch approved fields by category
    List<Field> findByCategoryAndStatus(String category, String status);

}
