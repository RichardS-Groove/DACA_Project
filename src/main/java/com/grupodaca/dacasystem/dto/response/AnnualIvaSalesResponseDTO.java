package com.grupodaca.dacasystem.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnualIvaSalesResponseDTO {
    private Integer year;
    private double totalIvaSales;
}
