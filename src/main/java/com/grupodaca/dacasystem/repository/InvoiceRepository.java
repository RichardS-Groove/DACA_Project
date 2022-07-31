package com.grupodaca.dacasystem.repository;

import com.grupodaca.dacasystem.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    Invoice findInvoiceById(long id);

    @Query("SELECT SUM(i.invoiceAmount) FROM Invoice i WHERE year(i.dateOfIssue)=:year AND month(i.dateOfIssue)=:month")
    Double obtainMonthlyBenefits(@Param("month") Integer month, @Param("year") Integer year);
    @Query("SELECT SUM(i.invoiceAmount) FROM Invoice i WHERE year(i.dateOfIssue)=:year")
    Double obtainAnnualBenefits(@Param("year") Integer year);
    @Query("SELECT SUM(i.iva) FROM Invoice i WHERE year(i.dateOfIssue)=:year AND month(i.dateOfIssue)=:month")
    Double obtainMonthlyIVA(@Param("month") Integer month, @Param("year") Integer year);
    @Query("SELECT SUM(i.iva) FROM Invoice i WHERE year(i.dateOfIssue)=:year")
    Double obtainAnnualIVA(@Param("year") Integer year);
    List<Invoice> findAll();

    void deleteById(Long id);


}
