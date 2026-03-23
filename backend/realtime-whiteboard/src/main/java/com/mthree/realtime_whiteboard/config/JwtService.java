package com.mthree.realtime_whiteboard.config;

/*
    This class provides methods for generating and validating JWT tokens.
    It uses a secret key to sign the tokens and includes an expiration time. '
    The generateToken method creates a token with the username as the subject.
    The extractUsername method retrieves the username from a given token.
    The isTokenValid method checks if a token is valid by attempting to parse its claims.
 */
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY = "mthree-realtime-whiteboard-secret-key-2026";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 2; // 2 hours

    //converts the string secret key to a cryptographic key for signing JWTs
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    //build and sign jwt token with the username as the subject and an expiration time
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    //pulls the username out of the token by parsing the claims and getting the subject field
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    //validates the token by trying to parse the claims. If parsing fails, it returns false
    public boolean isTokenValid(String token) {
        try {
            extractClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    //helper method to parse the claims from the token using the signing key
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
