package com.grupodaca.dacasystem.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "incomingBills")
public class IncomingBill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_incomingBill")
    private long id;
    @Column(name="invoiceNumber")
    private String invoiceNumber;
    @Column(name="dateOfIssue")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dateOfIssue;
    @Column(name="type")
    private String type;
    @ManyToOne
    private Supplier supplier;
    @Column(name="saleCondition")
    private String saleCondition;
    @Column(name="status")
    private String status;
    @JoinColumn(name="id_purchaseOrder")
    private long purchaseOrder;
    @Column(name="invoiceAmount")
    private double invoiceAmount;
    @Column(name="iva")
    private double iva;
}
