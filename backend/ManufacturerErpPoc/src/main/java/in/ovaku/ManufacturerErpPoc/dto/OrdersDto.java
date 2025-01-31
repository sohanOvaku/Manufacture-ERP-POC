package in.ovaku.ManufacturerErpPoc.dto;

import in.ovaku.ManufacturerErpPoc.entity.BillOfMaterial;
import in.ovaku.ManufacturerErpPoc.entity.OrderStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

public class OrdersDto {
    private Long id;
    private OrderStatus status;
    private Double finishedWeight;
    private Integer quantity;
    private BillOfMaterial billOfMaterial;
    private Date createdDate;
    private Date updatedDate;
    private String product;

    public OrdersDto(Long id, OrderStatus status, Double finishedWeight, Integer quantity, BillOfMaterial billOfMaterial, Date createdDate, Date updatedDate) {
        this.id = id;
        this.status = status;
        this.finishedWeight = finishedWeight;
        this.quantity = quantity;
        this.billOfMaterial = billOfMaterial;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    public OrdersDto(Long id, OrderStatus status, Double finishedWeight, Integer quantity, BillOfMaterial billOfMaterial, Date createdDate, Date updatedDate, String product) {
        this.id = id;
        this.status = status;
        this.finishedWeight = finishedWeight;
        this.quantity = quantity;
        this.billOfMaterial = billOfMaterial;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Double getFinishedWeight() {
        return finishedWeight;
    }

    public void setFinishedWeight(Double finishedWeight) {
        this.finishedWeight = finishedWeight;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BillOfMaterial getBillOfMaterial() {
        return billOfMaterial;
    }

    public void setBillOfMaterial(BillOfMaterial billOfMaterial) {
        this.billOfMaterial = billOfMaterial;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }
}
