package com.example.demo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public String login() {
        return "JWT_TOKEN_SAMPLE";
    }

    @PostMapping("/register")
    public String register() {
        return "User registered";
    }
}
