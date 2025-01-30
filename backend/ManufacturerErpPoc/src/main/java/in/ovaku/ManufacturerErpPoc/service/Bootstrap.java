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
//        inventoryRepository.save(new Inventory("iron", 1000000));
//        inventoryRepository.save(new Inventory("nickel", 250000));

        unitOfMeasureRepository.save(new UnitOfMeasure("steel_bottle", 100, 8000, 2000));

        User floorManager = new User();
        floorManager.setName("Subrata Bag");
        floorManager.setEmail("subratab@ovaku.in");
        floorManager.setPassword("1234");
        floorManager.setRole(UserRole.FLOOR_MANAGER);
        userRepository.save(floorManager);

        User productManager = new User();
        productManager.setName("Sohan Barman");
        productManager.setEmail("sohanb@ovaku.in");
        productManager.setPassword("1234");
        productManager.setRole(UserRole.PRODUCTION_MANAGER);
        userRepository.save(productManager);
    }
}
