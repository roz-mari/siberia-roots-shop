package com.siberiaroots.shop.order;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record Order(
        String id,
        String userId,
        List<OrderItem> items,
        String shippingName,
        String shippingEmail,
        String shippingAddress,
        String shippingCity,
        String shippingZip,
        BigDecimal total,
        OrderStatus status,
        Instant createdAt
) {
    public record OrderItem(
            String productId,
            String productName,
            BigDecimal price,
            int quantity
    ) {}
    
    public enum OrderStatus {
        PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    }
}

