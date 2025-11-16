package com.siberiaroots.shop.api;

import com.siberiaroots.shop.order.Order;
import com.siberiaroots.shop.order.OrderDtos;
import com.siberiaroots.shop.order.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Orders", description = "Order management (requires authentication)")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Operation(summary = "Create a new order", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<OrderDtos.OrderResponse> createOrder(
            @Valid @RequestBody OrderDtos.CreateOrderRequest request,
            HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        Order order = orderService.createOrder(userId, request);
        return ResponseEntity.ok(toResponse(order));
    }

    @Operation(summary = "Get user's order history", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping
    public ResponseEntity<List<OrderDtos.OrderResponse>> getUserOrders(HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        List<OrderDtos.OrderResponse> orders = orderService.getUserOrders(userId).stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(orders);
    }

    @Operation(summary = "Get order by ID", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/{id}")
    public ResponseEntity<OrderDtos.OrderResponse> getOrder(
            @PathVariable String id,
            HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        Order order = orderService.getOrder(id, userId);
        return ResponseEntity.ok(toResponse(order));
    }

    private OrderDtos.OrderResponse toResponse(Order order) {
        return new OrderDtos.OrderResponse(
                order.id(),
                order.items().stream()
                        .map(item -> new OrderDtos.OrderItemResponse(
                                item.productId(),
                                item.productName(),
                                item.price(),
                                item.quantity()
                        ))
                        .toList(),
                order.shippingName(),
                order.shippingEmail(),
                order.shippingAddress(),
                order.shippingCity(),
                order.shippingZip(),
                order.total(),
                order.status().name(),
                order.createdAt().toString()
        );
    }
}

