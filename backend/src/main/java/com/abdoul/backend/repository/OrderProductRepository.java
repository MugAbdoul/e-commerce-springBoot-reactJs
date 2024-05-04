package com.abdoul.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abdoul.backend.entities.OrderProduct;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, UUID> {
    // You can add custom query methods here if needed
}