package com.mthree.realtime_whiteboard.auth;

/*
    This controller handles HTTP requests for authentication.
    It exposes two endpoints: /api/auth/register and /api/auth/login.
    Both endpoints delegate to AuthService and return an AuthResponse containing
    the JWT token, username, and artistId.
 */
import com.mthree.realtime_whiteboard.dto.AuthResponse;
import com.mthree.realtime_whiteboard.dto.LoginRequest;
import com.mthree.realtime_whiteboard.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
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
}
