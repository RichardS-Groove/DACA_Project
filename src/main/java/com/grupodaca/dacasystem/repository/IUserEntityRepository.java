package com.grupodaca.dacasystem.repository;

import com.grupodaca.dacasystem.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserEntityRepository extends JpaRepository<UserEntity,Integer> {

    Optional<UserEntity> findByUsernameEquals(String username);


}
