package in.ovaku.ManufacturerErpPoc.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


//@Getter
//@Setter
@Entity
//@AllArgsConstructor
//@NoArgsConstructor
public class Inventory {
    @Id
    private String material;

    private double quantity;

    public Inventory(String material, double quantity) {
        this.material = material;
        this.quantity = quantity;
    }

    public Inventory() {
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public double getQuantity() {
        return quantity;
    }
}
