package com.bookmyfield.BookMyFieldBackend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.nio.charset.StandardCharsets;
import java.security.Key;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Value("${jwt.secret}") 
    private String secretKey;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            System.out.println("🚨 No Authorization header found or incorrect format.");
            chain.doFilter(request, response);
            return;
        }

        final String token = authorizationHeader.substring(7);

        try {
            final Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String email = claims.getSubject();
            String role = claims.get("role", String.class);

            System.out.println("✅ Extracted Role from JWT: " + role);

            if (email != null && role != null) {
                List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase())); 

                System.out.println("✅ Assigned Authorities: " + authorities);

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                new User(email, "", authorities), null, authorities);

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                System.out.println("🚨 Email or Role is NULL - JWT authentication failed.");
            }

        } catch (ExpiredJwtException e) {
            System.out.println("❌ Token Expired: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT Token has expired");
            return;
        } catch (MalformedJwtException e) {
            System.out.println("❌ Malformed Token: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
            return;
        } catch (Exception e) {
            System.out.println("❌ JWT Authentication Failed: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT Authentication Failed");
            return;
        }

        chain.doFilter(request, response);
    }
}
