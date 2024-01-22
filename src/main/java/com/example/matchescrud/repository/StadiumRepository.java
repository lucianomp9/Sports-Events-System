package com.example.matchescrud.repository;

import com.example.matchescrud.model.entity.Stadium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StadiumRepository extends JpaRepository<Stadium, Long> {
    @Query("SELECT s FROM Stadium s WHERE s.name = :stadiumName")
    Optional<Stadium> findByName(@Param("stadiumName") String stadiumName);}
