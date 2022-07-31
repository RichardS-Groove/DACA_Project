package com.grupodaca.dacasystem.repository;

import com.grupodaca.dacasystem.entity.IncomingBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomingBillRepository extends JpaRepository<IncomingBill,Long> {

    IncomingBill findIncomingBillById(long id);


    List<IncomingBill> findAll();

    void deleteById(Long id);

    @Query("SELECT SUM(i.invoiceAmount) FROM IncomingBill i WHERE year(i.dateOfIssue)=:year AND month(i.dateOfIssue)=:month")
    Double obtainMonthlyExpenses(@Param("month") Integer month, @Param("year") Integer year);

    @Query("SELECT SUM(i.invoiceAmount) FROM IncomingBill i WHERE year(i.dateOfIssue)=:year")
    Double obtainAnnualExpenses(@Param("year") Integer year);

    @Query("SELECT SUM(i.iva) FROM IncomingBill i WHERE year(i.dateOfIssue)=:year AND month(i.dateOfIssue)=:month")
    Double obtainMonthlyIVA(@Param("month") Integer month, @Param("year") Integer year);

    @Query("SELECT SUM(i.iva) FROM IncomingBill i WHERE year(i.dateOfIssue)=:year")
    Double obtainAnnualIVA(@Param("year") Integer year);
}
