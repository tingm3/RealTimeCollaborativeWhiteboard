package com.mthree.realtime_whiteboard.auth;

/*
    This controller handles HTTP requests for authentication.
    It exposes two endpoints: /api/auth/register and /api/auth/login.
    Both endpoints delegate to AuthService and return an AuthResponse containing
    the JWT token, username, and artistId.
 */
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mthree.realtime_whiteboard.dto.AuthResponse;
import com.mthree.realtime_whiteboard.dto.ChangePasswordRequest;
import com.mthree.realtime_whiteboard.dto.ChangeUsernameRequest;
import com.mthree.realtime_whiteboard.dto.LoginRequest;
import com.mthree.realtime_whiteboard.dto.RegisterRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // receives a RegisterRequest DTO and delegates to AuthService to create the user
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    // receives a LoginRequest DTO and delegates to AuthService to verify credentials
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteAccount(@AuthenticationPrincipal UserDetails userDetails) {
        authService.deleteAccount(userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/password")
    public ResponseEntity<Void> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ChangePasswordRequest request) {
        authService.changePassword(userDetails.getUsername(), request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/username")
    public ResponseEntity<AuthResponse> changeUsername(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ChangeUsernameRequest request) {
        return ResponseEntity.ok(authService.changeUsername(userDetails.getUsername(), request));
    }
}
