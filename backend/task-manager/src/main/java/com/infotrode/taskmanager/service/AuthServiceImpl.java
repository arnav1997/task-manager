package com.infotrode.taskmanager.service;

import com.infotrode.taskmanager.dto.RegisterDTO;
import com.infotrode.taskmanager.entity.Role;
import com.infotrode.taskmanager.entity.User;
import com.infotrode.taskmanager.exception.AuthException;
import com.infotrode.taskmanager.repository.RoleRepository;
import com.infotrode.taskmanager.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    @Override
    public String register(RegisterDTO registerDTO) {
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            throw new AuthException(HttpStatus.BAD_REQUEST, "Username already exists!");
        }
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new AuthException(HttpStatus.BAD_REQUEST, "Email already exists!");
        }
        User user = new User();
        user.setName(registerDTO.getName());
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("ROLE_USER");
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
        return "User added successfully!";
    }
}
