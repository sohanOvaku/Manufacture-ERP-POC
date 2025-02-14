package in.ovaku.ManufacturerErpPoc.service;

import in.ovaku.ManufacturerErpPoc.entity.Inventory;
import in.ovaku.ManufacturerErpPoc.entity.UnitOfMeasure;
import in.ovaku.ManufacturerErpPoc.entity.User;
import in.ovaku.ManufacturerErpPoc.entity.UserRole;
import in.ovaku.ManufacturerErpPoc.repository.InventoryRepository;
import in.ovaku.ManufacturerErpPoc.repository.UnitOfMeasureRepository;
import in.ovaku.ManufacturerErpPoc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Bootstrap implements CommandLineRunner {
    private final InventoryRepository inventoryRepository;
    private final UnitOfMeasureRepository unitOfMeasureRepository;
    private final UserRepository userRepository;

    public Bootstrap(InventoryRepository inventoryRepository, UnitOfMeasureRepository unitOfMeasureRepository, UserRepository userRepository) {
        this.inventoryRepository = inventoryRepository;
        this.unitOfMeasureRepository = unitOfMeasureRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!inventoryRepository.existsByMaterial("iron")) {
            inventoryRepository.save(new Inventory("iron", 10000));
        }
        if (!inventoryRepository.existsByMaterial("nickel")) {
            inventoryRepository.save(new Inventory("nickel", 5000));
        }

        unitOfMeasureRepository.save(new UnitOfMeasure("steel_bottle", 100, 8000, 2000));
        unitOfMeasureRepository.save(new UnitOfMeasure("tiffin_box", 10, 550, 450));

        if (!userRepository.existsByEmail("floor@ovaku.in")) {
            User floorManager = new User();
            floorManager.setName("Floor Manager");
            floorManager.setEmail("floor@ovaku.in");
            floorManager.setPassword("1234");
            floorManager.setRole(UserRole.FLOOR_MANAGER);
            userRepository.save(floorManager);
        }

        if (!userRepository.existsByEmail("admin@ovaku.in")) {
            User productManager = new User();
            productManager.setName("Admin");
            productManager.setEmail("admin@ovaku.in");
            productManager.setPassword("1234");
            productManager.setRole(UserRole.PRODUCTION_MANAGER);
            userRepository.save(productManager);
        }
    }
}
