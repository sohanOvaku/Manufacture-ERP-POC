package in.ovaku.ManufacturerErpPoc.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import in.ovaku.ManufacturerErpPoc.entity.Orders;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

public class BillOfMaterialDto {
    private Long id;
    private double ironUsed;
    private double nickelUsed;

    public BillOfMaterialDto(Long id, double ironUsed, double nickelUsed) {
        this.id = id;
        this.ironUsed = ironUsed;
        this.nickelUsed = nickelUsed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getIronUsed() {
        return ironUsed;
    }

    public void setIronUsed(double ironUsed) {
        this.ironUsed = ironUsed;
    }

    public double getNickelUsed() {
        return nickelUsed;
    }

    public void setNickelUsed(double nickelUsed) {
        this.nickelUsed = nickelUsed;
    }
}
