package com.grupodaca.dacasystem.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierRequestDTO {
    private long id;

    private String businessName;

    private long cuit;

    private String contactName;

    private String telephone;

    private String address;

    private String location;

    private String email;
}
