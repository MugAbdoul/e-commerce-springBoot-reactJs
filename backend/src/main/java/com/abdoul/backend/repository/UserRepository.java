package com.abdoul.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abdoul.backend.entities.Role;
import com.abdoul.backend.entities.User;

public interface UserRepository  extends JpaRepository<User, UUID>{
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
}
