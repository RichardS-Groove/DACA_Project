package com.grupodaca.dacasystem.repository;

import com.grupodaca.dacasystem.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustumerRepository extends JpaRepository<Customer, Long> {

    Customer findCustomerById(long id);

    List<Customer> findAll();

    void deleteById(Long id);
}
