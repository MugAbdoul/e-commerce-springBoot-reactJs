package com.abdoul.backend.controller.accountManagement;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.abdoul.backend.entities.User;
import com.abdoul.backend.entities.others.ChangePasswordRequest;
import com.abdoul.backend.entities.others.UserUpdateRequest;
import com.abdoul.backend.service.UserService;

@RestController
@RequestMapping("/api/v1/account")
public class UserInfo {

    private final UserService userService;

    public UserInfo(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<User> accountInfo(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    // Endpoint for modifying firstname, lastname, and phoneNumber
    @PatchMapping("/update-profile")
    public ResponseEntity<User> updateProfile(Authentication authentication, @RequestBody UserUpdateRequest updateRequest) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFirstname(updateRequest.getFirstname());
            user.setLastname(updateRequest.getLastname());
            user.setPhoneNumber(updateRequest.getPhoneNumber());
            userService.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    // Endpoint for updating profileImage
    @PatchMapping("/update-profile-image")
    public ResponseEntity<User> updateProfileImage(Authentication authentication, @RequestParam("image") MultipartFile image) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Save the image file and update profileImage field
            // This part depends on how you handle file uploads and storage
            userService.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    // Endpoint for changing password
    @PatchMapping("/change-password")
    public ResponseEntity<String> changePassword(Authentication authentication, @RequestBody ChangePasswordRequest changePasswordRequest) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Check if the old password matches
            if (!userService.checkPassword(user, changePasswordRequest.getOldPassword())) {
                return ResponseEntity.badRequest().body("Old password is incorrect.");
            }
            // Check if the new password matches the confirmation password
            if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
                return ResponseEntity.badRequest().body("New password and confirm password do not match.");
            }
            // Update the password
            userService.changePassword(user, changePasswordRequest.getNewPassword());
            return ResponseEntity.ok("Password changed successfully.");
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }
}
