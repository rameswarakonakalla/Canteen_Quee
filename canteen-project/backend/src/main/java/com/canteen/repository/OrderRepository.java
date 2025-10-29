package com.canteen.repository;
import com.canteen.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findTopByOrderByTokenNumberDesc();
}