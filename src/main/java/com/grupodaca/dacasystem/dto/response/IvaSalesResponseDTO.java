package com.grupodaca.dacasystem.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IvaSalesResponseDTO {
    @Max(value = 12)
    @Min(value = 1)
    private Integer month;
    private Integer year;
    private double totalIvaSales;
}
