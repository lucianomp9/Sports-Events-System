package com.example.matchescrud.repository;

import com.example.matchescrud.model.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long>{
    @Query("SELECT c FROM City c WHERE c.name = :cityName")
    Optional<City> findByName(@Param("cityName") String cityName);
}
