package in.ovaku.ManufacturerErpPoc.repository;

import in.ovaku.ManufacturerErpPoc.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, String> {
    boolean existsByMaterial(String name);
}
