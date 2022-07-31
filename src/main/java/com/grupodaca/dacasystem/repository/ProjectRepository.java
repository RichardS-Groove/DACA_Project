package com.grupodaca.dacasystem.repository;

import com.grupodaca.dacasystem.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findProjectById(long id);

    List<Project> findAll();

    void deleteById(Long id);
}
