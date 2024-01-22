package com.example.matchescrud.repository;

import com.example.matchescrud.model.entity.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DivisionRepository extends JpaRepository<Division, Long> {
    @Query("SELECT d FROM Division d WHERE d.name = :divisionName")
    Optional<Division> findByName(@Param("divisionName") String divisionName);
}
