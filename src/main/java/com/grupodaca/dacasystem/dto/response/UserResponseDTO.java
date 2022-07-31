package com.grupodaca.dacasystem.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResponseDTO {

    private Integer id;
    private String name;
    private String lastname;
    private String email;
    private String username;
    private String password;
    private String rol;
    private String token;

}
