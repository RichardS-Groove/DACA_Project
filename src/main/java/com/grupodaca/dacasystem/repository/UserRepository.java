package com.grupodaca.dacasystem.repository;

import com.grupodaca.dacasystem.entity.Customer;
import com.grupodaca.dacasystem.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    UserEntity findUserEntityById(Integer id);

    List<UserEntity> findAll();

    @Query("FROM UserEntity WHERE username=:username")
    UserEntity userSession(@Param("username") String username);

    @Query("SELECT SUM(i.invoiceAmount) FROM Invoice i WHERE year(i.dateOfIssue)=:year")
    Double obtainAnnualBenefits(@Param("year") Integer year);

    Optional<UserEntity> findByUsernameEquals(String username);

    void deleteById(Integer id);
}
