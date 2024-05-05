package com.abdoul.backend.controller.accountManagement;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.abdoul.backend.entities.User;
import com.abdoul.backend.entities.UserAddress;
import com.abdoul.backend.service.UserAddressService;
import com.abdoul.backend.service.UserService;

@RestController
@RequestMapping("/api/v1/account/address")
public class UserAddressController {

    private final UserAddressService userAddressService;
    private final UserService userService;

    @Autowired
    public UserAddressController(UserAddressService userAddressService, UserService userService) {
        this.userAddressService = userAddressService;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAddress> getUserAddressById(@PathVariable UUID id) {
        Optional<UserAddress> userAddress = userAddressService.findById(id);
        return userAddress.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserAddress>> getUserAddressesByUserId(@PathVariable UUID userId) {
        List<UserAddress> userAddresses = userAddressService.findByUserId(userId);
        return ResponseEntity.ok(userAddresses);
    }

    @PostMapping("")
    public ResponseEntity<UserAddress> createUserAddress(Authentication authentication, @RequestBody UserAddress userAddress) {

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            userAddress.setUser(user);
            UserAddress createdUserAddress = userAddressService.save(userAddress);
            return ResponseEntity.ok(createdUserAddress);
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAddress> updateUserAddress(@PathVariable UUID id, @RequestBody UserAddress userAddress) {
        if (!userAddressService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        userAddress.setId(id);
        UserAddress updatedUserAddress = userAddressService.save(userAddress);
        return ResponseEntity.ok(updatedUserAddress);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserAddress(@PathVariable UUID id) {
        userAddressService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
