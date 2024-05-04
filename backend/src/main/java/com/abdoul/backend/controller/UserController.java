package com.abdoul.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @GetMapping("/")
    public ResponseEntity<String> UserONly() {
        return ResponseEntity.ok("Hello from users only url");
    
    }
    
    @GetMapping("/getInfo")
    public ResponseEntity<String> UserInfo(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // Now you can access the user details
        String username = userDetails.getUsername();
        // You can retrieve more details as needed
        // For example: userDetails.getPassword(), userDetails.getAuthorities(), etc.
        
        // Construct and return the response as needed
        return ResponseEntity.ok(username);
    }

    
}
