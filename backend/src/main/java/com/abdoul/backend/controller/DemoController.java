package com.abdoul.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/demo")
    public ResponseEntity<String> demo(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // Now you can access the user details
        String username = userDetails.getUsername();
        // You can retrieve more details as needed
        // For example: userDetails.getPassword(), userDetails.getAuthorities(), etc.
        
        // Construct and return the response as needed
        return ResponseEntity.ok(username);
    }

    @GetMapping("/admin_only")
    public ResponseEntity<String> adminOnly() {
        return ResponseEntity.ok("Hello from admin only url");
    }
}