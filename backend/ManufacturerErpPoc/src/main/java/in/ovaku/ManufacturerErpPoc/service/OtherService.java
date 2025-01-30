package in.ovaku.ManufacturerErpPoc.service;

import in.ovaku.ManufacturerErpPoc.dto.InventoryDto;
import in.ovaku.ManufacturerErpPoc.entity.Inventory;
import in.ovaku.ManufacturerErpPoc.entity.UnitOfMeasure;
import in.ovaku.ManufacturerErpPoc.repository.InventoryRepository;
import in.ovaku.ManufacturerErpPoc.repository.UnitOfMeasureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class OtherService {
    private InventoryRepository inventoryRepository;
    private UnitOfMeasureRepository unitOfMeasureRepository;
    Logger logger = LoggerFactory.getLogger(this.getClass());

    public OtherService(InventoryRepository inventoryRepository, UnitOfMeasureRepository unitOfMeasureRepository) {
        this.inventoryRepository = inventoryRepository;
        this.unitOfMeasureRepository = unitOfMeasureRepository;
    }


    public InventoryDto getIron(){
        Inventory inventory = inventoryRepository.getById("iron");
        logger.info("Iron inventory: {}",inventory);
        return new InventoryDto(inventory.getMaterial(), inventory.getQuantity());
    }


    public InventoryDto getNickel(){
        Inventory inventory = inventoryRepository.getById("nickel");
        logger.info("Nickel inventory: {}",inventory);
        return new InventoryDto(inventory.getMaterial(), inventory.getQuantity());
    }


    public UnitOfMeasure getUnitOfMeasure(){
        UnitOfMeasure unitOfMeasure = unitOfMeasureRepository.getById("steel_bottle");
        logger.info("Unit of steel bottle: {}",unitOfMeasure);
        return new UnitOfMeasure(unitOfMeasure.getProduct(), unitOfMeasure.getQuantity(),
                unitOfMeasure.getIronRequired(), unitOfMeasure.getNickelRequired());
    }
}
