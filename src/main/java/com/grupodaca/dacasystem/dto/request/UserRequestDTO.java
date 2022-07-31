package com.grupodaca.dacasystem.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserRequestDTO {

    private Integer id;
    private String name;
    private String lastname;
    private String email;
    private String username;
    private String password;
    private String rol;

}
