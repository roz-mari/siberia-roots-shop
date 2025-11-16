package com.siberiaroots.shop.order;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class OrderDtos {
    public record CreateOrderRequest(
            @NotNull @Size(min = 1) List<OrderItemDto> items,
            @NotBlank @Size(max = 100) String shippingName,
            @NotBlank @Email @Size(max = 200) String shippingEmail,
            @NotBlank @Size(max = 200) String shippingAddress,
            @NotBlank @Size(max = 100) String shippingCity,
            @NotBlank @Size(max = 20) String shippingZip
    ) {}

    public record OrderItemDto(
            @NotBlank String productId,
            @NotNull Integer quantity
    ) {}

    public record OrderResponse(
            String id,
            List<OrderItemResponse> items,
            String shippingName,
            String shippingEmail,
            String shippingAddress,
            String shippingCity,
            String shippingZip,
            java.math.BigDecimal total,
            String status,
            String createdAt
    ) {}

    public record OrderItemResponse(
            String productId,
            String productName,
            java.math.BigDecimal price,
            Integer quantity
    ) {}
}

