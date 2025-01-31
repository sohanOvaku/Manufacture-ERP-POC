package in.ovaku.ManufacturerErpPoc.service;

import in.ovaku.ManufacturerErpPoc.dto.LoginRequestDto;
import in.ovaku.ManufacturerErpPoc.dto.LoginResponseDto;
import in.ovaku.ManufacturerErpPoc.entity.User;
import in.ovaku.ManufacturerErpPoc.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    Logger logger = LoggerFactory.getLogger(this.getClass());

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponseDto authenticateUser(LoginRequestDto loginRequest) {
        logger.info("Into authenticateUser:{}", loginRequest);
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isEmpty()) {
            logger.error("User not found");
            throw new RuntimeException(" User not found");
        }
        User user = userOpt.get();
        if (user.getPassword().equals(loginRequest.getPassword())) {
            return new LoginResponseDto(user.getId(), user.getName(), user.getEmail(), user.getRole(), true);
        }
        logger.error("Password not match Authentication Failed");
        throw new RuntimeException(" Authentication Failed");
    }
}
