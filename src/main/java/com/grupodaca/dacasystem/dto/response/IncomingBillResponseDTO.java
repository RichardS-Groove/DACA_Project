package com.grupodaca.dacasystem.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.grupodaca.dacasystem.entity.Supplier;
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
public class IncomingBillResponseDTO {

    private long id;

    private String invoiceNumber;

    private LocalDate dateOfIssue;

    private String type;

    private Supplier supplier;

    private String saleCondition;

    private String status;

    private long purchaseOrder;

    private double invoiceAmount;

    private double iva;
}
