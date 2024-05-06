package com.abdoul.backend.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.abdoul.backend.entities.ProductImage;
import com.abdoul.backend.service.ProductImageService;

@RestController
@RequestMapping("/api/product-images")
public class ProductImageController {

    private final ProductImageService productImageService;

    @Autowired
    public ProductImageController(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }

    @PostMapping
    public ResponseEntity<ProductImage> createProductImage(@RequestBody ProductImage productImage) {
        ProductImage createdProductImage = productImageService.createProductImage(productImage);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProductImage);
    }

}
