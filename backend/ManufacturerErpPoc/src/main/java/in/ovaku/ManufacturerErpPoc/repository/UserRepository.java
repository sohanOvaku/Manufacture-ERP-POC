package in.ovaku.ManufacturerErpPoc.repository;

import in.ovaku.ManufacturerErpPoc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
