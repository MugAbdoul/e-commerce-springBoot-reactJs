package com.abdoul.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAddressRepository extends JpaRepository<UserAddressRepository, UUID>{
    
}
