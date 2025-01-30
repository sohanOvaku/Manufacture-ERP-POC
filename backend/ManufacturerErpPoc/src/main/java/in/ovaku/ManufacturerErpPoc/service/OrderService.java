package in.ovaku.ManufacturerErpPoc.service;

import in.ovaku.ManufacturerErpPoc.dto.BillOfMaterialDto;
import in.ovaku.ManufacturerErpPoc.dto.OrdersDto;
import in.ovaku.ManufacturerErpPoc.entity.*;
import in.ovaku.ManufacturerErpPoc.repository.BillOfMaterialRepository;
import in.ovaku.ManufacturerErpPoc.repository.InventoryRepository;
import in.ovaku.ManufacturerErpPoc.repository.OrderRepository;
import in.ovaku.ManufacturerErpPoc.repository.UnitOfMeasureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final BillOfMaterialRepository bomRepository;
    private final InventoryRepository inventoryRepository;
    private final UnitOfMeasureRepository unitOfMeasureRepository;

    Logger logger = LoggerFactory.getLogger(this.getClass());

    public OrderService(OrderRepository orderRepository, BillOfMaterialRepository bomRepository, InventoryRepository inventoryRepository, UnitOfMeasureRepository unitOfMeasureRepository) {
        this.orderRepository = orderRepository;
        this.bomRepository = bomRepository;
        this.inventoryRepository = inventoryRepository;
        this.unitOfMeasureRepository = unitOfMeasureRepository;
    }

    public OrdersDto createOrder(int bottleQuantity) {
        logger.info("Into create order: bottle quantity:{}",bottleQuantity);

        UnitOfMeasure uom = unitOfMeasureRepository.findById("steel_bottle").orElseThrow(() -> {
            logger.error("UnitOfMeasure not found");
            return new RuntimeException("UnitOfMeasure not found");
        });

        logger.info("Steel bottle unit: {}",uom);
        double ironRequired = (bottleQuantity / (double) uom.getQuantity()) * uom.getIronRequired();
        logger.info("Iron required: {}", ironRequired);
        double nickelRequired = (bottleQuantity / (double) uom.getQuantity()) * uom.getNickelRequired();
        logger.info("Nickel required: {}", ironRequired);

        Inventory iron = inventoryRepository.findById("iron")
                .orElseThrow(() -> new RuntimeException("Iron inventory not found"));
        logger.info("Fetched iron: {}",iron.getQuantity());
        Inventory nickel = inventoryRepository.findById("nickel")
                .orElseThrow(() -> new RuntimeException("Nickel inventory not found"));
        logger.info("Fetched nickel: {}",nickel.getQuantity());

        if (iron.getQuantity() < ironRequired || nickel.getQuantity() < nickelRequired) {
            logger.error("Insufficient inventory");
            throw new RuntimeException("Insufficient inventory");
        }

        // Deduct materials from inventory
        iron.setQuantity(iron.getQuantity() - ironRequired);
        iron = inventoryRepository.save(iron);
        logger.info("After deduct iron:{}",iron);
        nickel.setQuantity(nickel.getQuantity() - nickelRequired);
        nickel = inventoryRepository.save(nickel);
        logger.info("After deduct nickel:{}",nickel);

        Orders orders = new Orders();
        orders.setQuantity(bottleQuantity);
        orders.setStatus(OrderStatus.PENDING);
        orderRepository.save(orders);
        logger.info("Order record saved: {}", orders);
        BillOfMaterial bom = new BillOfMaterial();
        bom.setOrder(orders);
        bom.setIronUsed(ironRequired);
        bom.setNickelUsed(nickelRequired);
        bom = bomRepository.save(bom);
        logger.info("Order Bill of material : {}",bom);
        return getById(orders.getId());
    }

    public OrdersDto updateOrderStatus(Long orderId, OrderStatus status, Double finishedWeight) {
        logger.info("Into updateOrderStatus: {}, {}, {}", orderId, status,finishedWeight);
        Orders orders = orderRepository.findById(orderId)
                .orElseThrow(() -> {
                    logger.error("Order not found");
                    return new RuntimeException("Order not found");
                });
        logger.info("Fetched Order:{}", orders);

        if (orders.getStatus() == OrderStatus.DONE) {
            logger.error("Order is already completed");
            throw new RuntimeException("Order is already completed");
        }

        if (status == OrderStatus.DONE && finishedWeight == null) {
            logger.error("Finished weight is required when marking as DONE");
            throw new RuntimeException("Finished weight is required when marking as DONE");
        }

        orders.setStatus(status);

        if (status == OrderStatus.DONE) {
            orders.setFinishedWeight(finishedWeight);
        }

        orders = orderRepository.save(orders);
        logger.info("Order record updated:{}", orders);
        return new OrdersDto(orders.getId(), orders.getStatus(),orders.getFinishedWeight(),
                orders.getQuantity(),orders.getBillOfMaterial(),orders.getCreatedDate(),orders.getUpdatedDate());

    }

    public List<OrdersDto> getAll(){
        logger.info("Into get all order");
        List<Orders> ordersList = orderRepository.findAll();
        return ordersList.stream()
                .map(orders -> new OrdersDto(
                        orders.getId(),
                        orders.getStatus(),
                        orders.getFinishedWeight(),
                        orders.getQuantity(),
                        orders.getBillOfMaterial(),
                        orders.getCreatedDate(),
                        orders.getUpdatedDate()))
                .collect(Collectors.toList());
    }

    public OrdersDto getById(Long id){
        Optional<Orders> optionalOrder = orderRepository.findById(id);
        if(optionalOrder.isEmpty()){
            logger.error("No order found");
            throw new RuntimeException("No order found");
        }
        Orders orders = optionalOrder.get();
        logger.info("Found order: {}", orders);
        OrdersDto ordersDto = new OrdersDto(orders.getId(), orders.getStatus(),orders.getFinishedWeight(),
                orders.getQuantity(),orders.getBillOfMaterial(),orders.getCreatedDate(),orders.getUpdatedDate());
        return ordersDto;
    }
}
