package com.infotrode.taskmanager.controller;

import com.infotrode.taskmanager.dto.LoginDTO;
import com.infotrode.taskmanager.dto.RegisterDTO;
import com.infotrode.taskmanager.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {
    private AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<String> registerUser (@RequestBody RegisterDTO registerDTO) {
        String response = authService.register(registerDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login (@RequestBody LoginDTO loginDTO) {
        String response = authService.login(loginDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}