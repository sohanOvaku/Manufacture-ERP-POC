package in.ovaku.ManufacturerErpPoc.dto;

import in.ovaku.ManufacturerErpPoc.entity.OrderStatus;

public class OrderRequestDto {
    private Long orderId;
    private OrderStatus status;
    private Double finishedWeight;
}
