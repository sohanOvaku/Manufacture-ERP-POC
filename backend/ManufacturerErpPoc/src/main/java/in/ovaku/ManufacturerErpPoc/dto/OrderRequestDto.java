package in.ovaku.ManufacturerErpPoc.dto;

import in.ovaku.ManufacturerErpPoc.entity.OrderStatus;

public class OrderRequestDto {
//    private Long orderId;
    private OrderStatus status;
    private Double finishedWeight;

    public OrderRequestDto(OrderStatus status, Double finishedWeight) {
        this.status = status;
        this.finishedWeight = finishedWeight;
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
}
