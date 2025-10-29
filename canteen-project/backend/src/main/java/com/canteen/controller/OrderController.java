package com.canteen.controller;
import com.canteen.entity.Order;
import com.canteen.repository.OrderRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    private final OrderRepository orderRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public OrderController(OrderRepository orderRepository, SimpMessagingTemplate messagingTemplate) {
        this.orderRepository = orderRepository; this.messagingTemplate = messagingTemplate;
    }

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        Order last = orderRepository.findTopByOrderByTokenNumberDesc();
        int lastToken = (last != null && last.getTokenNumber() != null) ? last.getTokenNumber() : 0;
        order.setTokenNumber(lastToken + 1);
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());
        Order saved = orderRepository.save(order);
        messagingTemplate.convertAndSend("/topic/orders", saved);
        return saved;
    }

    @GetMapping
    public java.util.List<Order> listOrders() { return orderRepository.findAll(); }

    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestParam String status) {
        Order o = orderRepository.findById(id).orElseThrow();
        o.setStatus(status);
        Order saved = orderRepository.save(o);
        messagingTemplate.convertAndSend("/topic/orders", saved);
        return saved;
    }
}