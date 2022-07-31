package com.grupodaca.dacasystem.repository;

import com.grupodaca.dacasystem.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    Supplier findSupplierById(long id);

    List<Supplier> findAll();

    void deleteById(Long id);
}
