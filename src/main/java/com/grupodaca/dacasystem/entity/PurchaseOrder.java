package com.grupodaca.dacasystem.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_note")
    private Long id;
    @Column(name="dateOfIssue")
    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dateOfIssue;
    @Column(name="type")
    private String type;
    @ManyToOne
    private Supplier supplier;
    @Column(name="saleCondition")
    private String saleCondition;
    @Column(name="paymentDate")
    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate paymentDate;
    @Column(name="paymentMethod")
    private String paymentMethod;
    @Column(name="status")
    private String status;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Item> itemsList;
    @Column(name="dateOfDelivery")
    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dateOfDelivery;
    @ManyToOne
    private Project project;
}
