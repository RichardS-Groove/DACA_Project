package com.grupodaca.dacasystem.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.grupodaca.dacasystem.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResponseDTO {

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
