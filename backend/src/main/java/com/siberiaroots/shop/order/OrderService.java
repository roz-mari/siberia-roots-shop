package com.siberiaroots.shop.order;

import com.siberiaroots.shop.catalog.Product;
import com.siberiaroots.shop.catalog.ProductService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final ProductService productService;
    private final Map<String, Order> ordersById = new ConcurrentHashMap<>();
    private final Map<String, List<Order>> ordersByUserId = new ConcurrentHashMap<>();

    public OrderService(ProductService productService) {
        this.productService = productService;
    }

    public Order createOrder(String userId, OrderDtos.CreateOrderRequest request) {
        List<Order.OrderItem> items = request.items().stream()
                .map(itemDto -> {
                    Product product = productService.getProduct(itemDto.productId());
                    return new Order.OrderItem(
                            product.id(),
                            product.name().en(), // Use English name for order
                            product.price(),
                            itemDto.quantity()
                    );
                })
                .collect(Collectors.toList());

        BigDecimal total = items.stream()
                .map(item -> item.price().multiply(BigDecimal.valueOf(item.quantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order(
                UUID.randomUUID().toString(),
                userId,
                items,
                request.shippingName(),
                request.shippingEmail(),
                request.shippingAddress(),
                request.shippingCity(),
                request.shippingZip(),
                total,
                Order.OrderStatus.PENDING,
                Instant.now()
        );

        ordersById.put(order.id(), order);
        ordersByUserId.computeIfAbsent(userId, k -> new java.util.ArrayList<>()).add(order);

        return order;
    }

    public List<Order> getUserOrders(String userId) {
        return ordersByUserId.getOrDefault(userId, List.of());
    }

    public Order getOrder(String orderId, String userId) {
        Order order = ordersById.get(orderId);
        if (order == null || !order.userId().equals(userId)) {
            throw new OrderNotFoundException(orderId);
        }
        return order;
    }
}

