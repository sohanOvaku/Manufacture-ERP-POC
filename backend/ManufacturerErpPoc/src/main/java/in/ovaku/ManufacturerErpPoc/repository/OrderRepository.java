package in.ovaku.ManufacturerErpPoc.repository;

import in.ovaku.ManufacturerErpPoc.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long> {
}
