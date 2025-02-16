package com.bookmyfield.BookMyFieldBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.bookmyfield.BookMyFieldBackend") // Ensure package scanning
public class BookMyFieldBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookMyFieldBackendApplication.class, args);
    }
}
