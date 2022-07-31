package com.grupodaca.dacasystem.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Valid
public class MonthyAmountResponseDTO {
    @Max(value = 12)
    @Min(value = 1)
    private Integer month;
    private Integer year;
    private double total_income;
}
