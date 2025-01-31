package in.ovaku.ManufacturerErpPoc.controller;

import in.ovaku.ManufacturerErpPoc.dto.OrderRequestDto;
import in.ovaku.ManufacturerErpPoc.entity.Orders;
import in.ovaku.ManufacturerErpPoc.entity.OrderStatus;
import in.ovaku.ManufacturerErpPoc.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private OrderService orderService;
    Logger logger = LoggerFactory.getLogger(this.getClass());

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Object> createOrder(@RequestParam Integer quantity, @RequestParam String uomId) {
        logger.info("Into create order controller :{}, uomId {}", quantity, uomId);
        try {
            return ResponseEntity.ok(orderService.createOrder(quantity, uomId));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateOrderStatus(
            @PathVariable Long id, @RequestBody OrderRequestDto dto
//            @RequestParam OrderStatus status,
//            @RequestParam(required = false) Double finishedWeight
    ) {
        logger.info("Into update order controller:{}, {}", id, dto);
        try {
            return ResponseEntity.ok(orderService.updateOrderStatus(id, dto));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping()
    public ResponseEntity<Object> getAllOrder() {
        logger.info("Into get all order controller");
        try {
            return ResponseEntity.ok(orderService.getAll());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOrder(@PathVariable Long id) {
        logger.info("Into get order :{}", id);
        try {
            return ResponseEntity.ok(orderService.getById(id));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
