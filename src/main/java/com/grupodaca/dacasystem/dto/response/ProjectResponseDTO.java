package com.grupodaca.dacasystem.dto.response;

import com.grupodaca.dacasystem.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponseDTO {
    private long id;

    private String name;

    private String address;

    private String location;

    private Customer customer;

    private double purchaseOrderAmount;

    private double mts2;

    private Integer numberOfModules;

    private Integer amountOfAluminum;

    private Integer percentageOfCompletion;

    private LocalDate purchaseOrderDate;

    private LocalDate startDate;

    private LocalDate lastCertificationDate;

    private String notes;
}
