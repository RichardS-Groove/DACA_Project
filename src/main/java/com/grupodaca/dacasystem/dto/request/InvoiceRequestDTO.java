package com.grupodaca.dacasystem.dto.request;

import com.grupodaca.dacasystem.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceRequestDTO {

    private long id;

    private String invoiceNumber;

    private LocalDate dateOfIssue;

    private String type;

    private Customer customer;

    private String saleCondition;

    private String status;

    private long purchaseOrder;

    private double invoiceAmount;

    private double iva;
}
