package in.ovaku.ManufacturerErpPoc.controller;

import in.ovaku.ManufacturerErpPoc.entity.Inventory;
import in.ovaku.ManufacturerErpPoc.entity.UnitOfMeasure;
import in.ovaku.ManufacturerErpPoc.repository.InventoryRepository;
import in.ovaku.ManufacturerErpPoc.repository.UnitOfMeasureRepository;
import in.ovaku.ManufacturerErpPoc.service.OtherService;
import in.ovaku.ManufacturerErpPoc.service.StatisticsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OtherController {
    private StatisticsService statisticsService;
    private OtherService otherService;
    Logger logger = LoggerFactory.getLogger(this.getClass());

    public OtherController(OtherService otherService, StatisticsService statisticsService) {
        this.otherService = otherService;
        this.statisticsService = statisticsService;
    }

    @GetMapping("/irons")
    public ResponseEntity<Object> getIron(){
        return ResponseEntity.ok(otherService.getIron());
    }

    @GetMapping("/nickels")
    public ResponseEntity<Object> getNickel(){
        return ResponseEntity.ok(otherService.getNickel());
    }

    @GetMapping("/units/steel_bottles")
    public ResponseEntity<Object> getUnitOfMeasure(){
        return ResponseEntity.ok(otherService.getUnitOfMeasure());
    }

    @GetMapping("/orders/stats")
    public ResponseEntity<Object> getOrderStats(){
        return ResponseEntity.ok(statisticsService.getStatistics());
    }
}
