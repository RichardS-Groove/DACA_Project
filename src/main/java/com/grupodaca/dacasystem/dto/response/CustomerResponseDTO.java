package com.grupodaca.dacasystem.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponseDTO {
    private long id;

    private String businessName;

    private long cuit;

    private String contactName;

    private String telephone;

    private String address;

    private String location;

    private String email;
}
