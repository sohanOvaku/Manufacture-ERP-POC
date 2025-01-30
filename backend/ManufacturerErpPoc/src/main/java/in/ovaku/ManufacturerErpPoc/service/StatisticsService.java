package in.ovaku.ManufacturerErpPoc.service;

import in.ovaku.ManufacturerErpPoc.dto.OrdersDto;
import in.ovaku.ManufacturerErpPoc.entity.BillOfMaterial;
import in.ovaku.ManufacturerErpPoc.entity.Inventory;
import in.ovaku.ManufacturerErpPoc.entity.OrderStatus;
import in.ovaku.ManufacturerErpPoc.entity.Orders;
import in.ovaku.ManufacturerErpPoc.repository.BillOfMaterialRepository;
import in.ovaku.ManufacturerErpPoc.repository.InventoryRepository;
import in.ovaku.ManufacturerErpPoc.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticsService {
    private final BillOfMaterialRepository bomRepository;
    private final InventoryRepository inventoryRepository;
//    private final OrderRepository ordersRepository;
    private OrderService orderService;

    public StatisticsService(BillOfMaterialRepository bomRepository, InventoryRepository inventoryRepository, OrderService orderService) {
        this.bomRepository = bomRepository;
        this.inventoryRepository = inventoryRepository;
        this.orderService = orderService;
    }
    public Map<String, Object> getStatistics() {
        double totalIronUsed = 0;
        double totalNickelUsed = 0;
        double totalFinishedWeight = 0;

        List<OrdersDto> completedOrders = orderService.getAll()
                .stream()
                .filter(order -> order.getStatus() == OrderStatus.DONE)
                .toList();

        for (OrdersDto order : completedOrders) {
            BillOfMaterial bom = bomRepository.findById(order.getBillOfMaterial().getId()).get(); // Assuming 1 BoM per order
            totalIronUsed += bom.getIronUsed();
            totalNickelUsed += bom.getNickelUsed();
            totalFinishedWeight += order.getFinishedWeight();
        }

        // 🔹 Calculate Total Waste
        double totalMaterialUsed = totalIronUsed + totalNickelUsed;
        double totalWaste = totalMaterialUsed > totalFinishedWeight ? totalMaterialUsed - totalFinishedWeight : totalFinishedWeight - totalMaterialUsed;

        // 🔹 Calculate Iron and Nickel Waste
        double ironWaste = (totalIronUsed / totalMaterialUsed) * totalWaste;
        double nickelWaste = (totalNickelUsed / totalMaterialUsed) * totalWaste;

        Inventory ironInventory = inventoryRepository.findById("iron").orElseThrow();
        Inventory nickelInventory = inventoryRepository.findById("nickel").orElseThrow();

        Map<String, Object> stats = new HashMap<>();
        stats.put("usedMaterial", Map.of("iron", totalIronUsed, "nickel", totalNickelUsed));
        stats.put("wasteMaterial", Map.of("iron", ironWaste, "nickel", nickelWaste));
        stats.put("remainingMaterial", Map.of("iron", ironInventory.getQuantity(), "nickel", nickelInventory.getQuantity()));

        return stats;
    }
}
