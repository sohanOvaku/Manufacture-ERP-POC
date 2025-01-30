package in.ovaku.ManufacturerErpPoc.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

//@Getter
//@Setter
@Entity
//@AllArgsConstructor
//@NoArgsConstructor
@Builder
public class UnitOfMeasure {
    @Id
    private String product;

    private int quantity;
    private double ironRequired;
    private double nickelRequired;

    public UnitOfMeasure(String product, int quantity, double ironRequired, double nickelRequired) {
        this.product = product;
        this.quantity = quantity;
        this.ironRequired = ironRequired;
        this.nickelRequired = nickelRequired;
    }

    public UnitOfMeasure() {
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getIronRequired() {
        return ironRequired;
    }

    public void setIronRequired(double ironRequired) {
        this.ironRequired = ironRequired;
    }

    public double getNickelRequired() {
        return nickelRequired;
    }

    public void setNickelRequired(double nickelRequired) {
        this.nickelRequired = nickelRequired;
    }
}
