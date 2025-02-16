package com.bookmyfield.BookMyFieldBackend.service;

import com.bookmyfield.BookMyFieldBackend.dto.SignupRequest;
import com.bookmyfield.BookMyFieldBackend.dto.AuthResponse;
import com.bookmyfield.BookMyFieldBackend.model.Role;
import com.bookmyfield.BookMyFieldBackend.model.User;
import com.bookmyfield.BookMyFieldBackend.repository.UserRepository;
import com.bookmyfield.BookMyFieldBackend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse registerUser(SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setMobile(signupRequest.getMobile());
        user.setCustomerName(signupRequest.getCustomerName());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword())); 
        user.setRole(Role.valueOf(signupRequest.getRole().toUpperCase())); 

        userRepository.save(user);

        // Generate token for new user and return
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getRole().name()); // Return token and role
    }

    public AuthResponse loginUser(SignupRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                // ✅ Fix: No "ROLE_" prefix in token
                String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
                return new AuthResponse(token, user.getRole().name());
            }
        }
        throw new RuntimeException("Invalid email or password!");
    }
}
