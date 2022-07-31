package com.grupodaca.dacasystem.repository;

import com.grupodaca.dacasystem.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {

    Optional<PurchaseOrder> findById(Integer id);

    List<PurchaseOrder> findAll();

    void deleteById(Long id);
}
