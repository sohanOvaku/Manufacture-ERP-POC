package in.ovaku.ManufacturerErpPoc.dto;

import in.ovaku.ManufacturerErpPoc.entity.UserRole;

public class LoginResponseDto {
    private Long id;
    private String name;
    private String email;
    private UserRole role;
    private Boolean isAuthenticate;

    public LoginResponseDto() {
    }

    public LoginResponseDto(Long id, String name, String email, UserRole role, Boolean isAuthenticate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.isAuthenticate = isAuthenticate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Boolean getAuthenticate() {
        return isAuthenticate;
    }

    public void setAuthenticate(Boolean authenticate) {
        isAuthenticate = authenticate;
    }
}
