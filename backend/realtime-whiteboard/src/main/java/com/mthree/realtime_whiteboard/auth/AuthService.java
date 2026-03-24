package com.mthree.realtime_whiteboard.auth;

/*
    This service handles the business logic for authentication.
    register() creates a new Artist, hashes the password, saves to the DB, and returns a JWT.
    login() verifies credentials via AuthenticationManager, loads the user, and returns a JWT.
 */
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mthree.realtime_whiteboard.config.JwtService;
import com.mthree.realtime_whiteboard.dto.AuthResponse;
import com.mthree.realtime_whiteboard.dto.ChangePasswordRequest;
import com.mthree.realtime_whiteboard.dto.ChangeUsernameRequest;
import com.mthree.realtime_whiteboard.dto.LoginRequest;
import com.mthree.realtime_whiteboard.dto.RegisterRequest;
import com.mthree.realtime_whiteboard.model.Artist;
import com.mthree.realtime_whiteboard.repository.ArtistRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final ArtistRepository artistRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // hashes the password, saves the new Artist to the DB, generates and returns a JWT
    public AuthResponse register(RegisterRequest request) {
        if (artistRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already taken");
        }
        Artist artist = new Artist();
        artist.setUsername(request.getUsername());
        artist.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        artistRepository.save(artist);
        String token = jwtService.generateToken(artist.getUsername());
        return new AuthResponse(token, artist.getUsername(), artist.getId());
    }

    // verifies credentials via AuthenticationManager, loads the user, generates and returns a JWT
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        Artist artist = artistRepository.findByUsername(request.getUsername())
                .orElseThrow();
        String token = jwtService.generateToken(artist.getUsername());
        return new AuthResponse(token, artist.getUsername(), artist.getId());
    }

    public void deleteAccount(String username) {
        Artist artist = artistRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        artistRepository.delete(artist);
    }

    public void changePassword(String username, ChangePasswordRequest request) {
        Artist artist = artistRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"
        ));

        if (!passwordEncoder.matches(request.getCurrentPassword(), artist.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password");
        }

        artist.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        artistRepository.save(artist);
    }

    public AuthResponse changeUsername(String currentUsername, ChangeUsernameRequest request) {
        if (artistRepository.findByUsername(request.getNewUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already taken");

        }
        Artist artist = artistRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        artist.setUsername(request.getNewUsername());
        artistRepository.save(artist);
        String token = jwtService.generateToken(artist.getUsername());
        return new AuthResponse(token, artist.getUsername(), artist.getId());
    }
}
