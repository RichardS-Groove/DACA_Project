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
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_note")
    private long id;
    @Column(name="dateOfIssue")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dateOfIssue;
    @Column(name="type")
    private String type;
    @Column(name="saleCondition")
    private String saleCondition;
    @Column(name="status")
    private String status;
    @JoinColumn(name="id_purchaseOrder")
    private long purchaseOrder;
    @Column(name="noteNumber")
    private String noteNumber;
    @JoinColumn(name="id_invoice")
    private String invoice;
    @Column(name="IVACondition")
    private String IVACondition;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Item> itemsList;
    @JoinColumn(name="id_carrier")
    private long carrier;
    @ManyToOne
    private Project project;
}
