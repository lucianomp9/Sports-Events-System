package com.example.matchescrud.controller;


import com.example.matchescrud.dto.CityDTO;
import com.example.matchescrud.exceptions.ApiException;
import com.example.matchescrud.service.CityServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("http://localhost:4200")
public class CityController {

    //Dependency injection
    private final CityServiceImp cityServiceImp;
    public CityController(CityServiceImp cityServiceImp){
        this.cityServiceImp = cityServiceImp;
    }

    //Get all cities from DB
    @GetMapping("/city")
    public ResponseEntity<List<CityDTO>> getAll(){
        return new ResponseEntity<>(cityServiceImp.getAllCity(), HttpStatus.OK);
    }

    //Get city by its ID
    @GetMapping("/city/{id}")
    public ResponseEntity<CityDTO> getCityById(@PathVariable Long id) throws ApiException {
        return new ResponseEntity<>(cityServiceImp.getCityById(id), HttpStatus.OK);
    }

    //Update city
    @PutMapping("/city/{id}")
    public ResponseEntity<?> updateCityById(@PathVariable Long id, @RequestBody CityDTO cityDTO) throws ApiException {
        return new ResponseEntity<>(cityServiceImp.updateCityById(id, cityDTO), HttpStatus.OK);
    }

    //Create city
    @PostMapping("/city")
    public ResponseEntity<?> createCity(@RequestBody CityDTO cityDTO) throws ApiException {
        return new ResponseEntity<>(cityServiceImp.createCity(cityDTO), HttpStatus.CREATED);
    }

    //Delete city
    @DeleteMapping("/city/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable Long id) throws ApiException {
        return new ResponseEntity<>(cityServiceImp.deleteCityById(id), HttpStatus.OK);
    }
}
