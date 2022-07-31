package com.grupodaca.dacasystem.entity;

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
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name="id")
    private long id;

    @Column(name="name")
    private String name;

    @Column(name="address")
    private String address;

    @Column(name="location")
    private String location;

    @ManyToOne
    private Customer customer;

    @Column(name="purchaseOrderAmount")
    private double purchaseOrderAmount;

    @Column(name="mts2")
    private double mts2;

    @Column(name="numberOfModules")
    private Integer numberOfModules;

    @Column(name="amountOfAluminum")
    private Integer amountOfAluminum;

    @Column(name="percentageOfCompletion")
    private Integer percentageOfCompletion;

    @Column(name="purchaseOrderDate")
    private LocalDate purchaseOrderDate;

    @Column(name="startDate")
    private LocalDate startDate;

    @Column(name="lastCertificationDate")
    private LocalDate lastCertificationDate;

    @Column(name="notes")
    private String notes;

}
