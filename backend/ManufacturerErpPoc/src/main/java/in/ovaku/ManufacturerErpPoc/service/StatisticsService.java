package in.ovaku.ManufacturerErpPoc.service;

import in.ovaku.ManufacturerErpPoc.dto.OrdersDto;
import in.ovaku.ManufacturerErpPoc.entity.BillOfMaterial;
import in.ovaku.ManufacturerErpPoc.entity.Inventory;
import in.ovaku.ManufacturerErpPoc.entity.OrderStatus;
import in.ovaku.ManufacturerErpPoc.entity.Orders;
import in.ovaku.ManufacturerErpPoc.repository.BillOfMaterialRepository;
import in.ovaku.ManufacturerErpPoc.repository.InventoryRepository;
import in.ovaku.ManufacturerErpPoc.repository.OrderRepository;
import in.ovaku.ManufacturerErpPoc.utils.ConversionUtils;
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
        double totalIronPending = 0;
        double totalNickelPending = 0;
        double totalIronInUse = 0;
        double totalNickelInUse = 0;

        List<OrdersDto> orders = orderService.getAll();

        for (OrdersDto order : orders) {
            BillOfMaterial bom = bomRepository.findById(order.getBillOfMaterial().getId()).get(); // Assuming 1 BoM per order

            switch (order.getStatus()) {
                case DONE -> {
                    totalIronUsed += bom.getIronUsed();
                    totalNickelUsed += bom.getNickelUsed();
                    totalFinishedWeight += order.getFinishedWeight();
                    break;
                }
                case PENDING -> {
                    totalIronPending += bom.getIronUsed();
                    totalNickelPending += bom.getNickelUsed();
                    break;
                }
                case IN_PROGRESS -> {
                    totalIronInUse += bom.getIronUsed();
                    totalNickelInUse += bom.getNickelUsed();
                    break;
                }
            }
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
        stats.put("wasteMaterial", Map.of("iron", ironWaste, "nickel",nickelWaste));
        stats.put("pendingMaterial", Map.of("iron", totalIronPending, "nickel", totalNickelPending));
        stats.put("inProgressMaterial", Map.of("iron", totalIronInUse, "nickel", totalNickelInUse));

        return stats;
    }
}
