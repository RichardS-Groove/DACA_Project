package com.grupodaca.dacasystem.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.grupodaca.dacasystem.entity.Item;
import com.grupodaca.dacasystem.entity.Project;
import com.grupodaca.dacasystem.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseOrderResponseDTO {
    private Integer id;

    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dateOfIssue;

    private String type;

    private Supplier supplier;

    private String saleCondition;

    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate paymentDate;

    private String paymentMethod;

    private String status;

    private List<Item> itemsList;

    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dateOfDelivery;

    private Project project;
}
