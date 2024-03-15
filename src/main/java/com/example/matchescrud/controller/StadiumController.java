package com.example.matchescrud.controller;

import com.example.matchescrud.dto.StadiumDTO;
import com.example.matchescrud.exceptions.ApiException;
import com.example.matchescrud.service.StadiumServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("http://localhost:4200")
public class StadiumController {

    //Dependency injection
    private final StadiumServiceImp stadiumServiceImp;
    public StadiumController(StadiumServiceImp stadiumServiceImp){
        this.stadiumServiceImp = stadiumServiceImp;
    }

    //Get all stadiums from DB
    @GetMapping("/stadium")
    public ResponseEntity<List<StadiumDTO>> getAll(){
        return new ResponseEntity<>(stadiumServiceImp.getAllStadiums(), HttpStatus.OK);
    }

    //Get stadiums by their ID
    @GetMapping("/stadium/{id}")
    public ResponseEntity<StadiumDTO> getTeam(@PathVariable Long id) throws ApiException {
        return new ResponseEntity<>(stadiumServiceImp.getStadiumById(id), HttpStatus.OK);
    }

    //Post
    @PostMapping("/stadium")
    public ResponseEntity<StadiumDTO> createStadium(@Valid @RequestBody StadiumDTO stadiumDTO) throws ApiException {
        return new ResponseEntity<>(stadiumServiceImp.createStadium(stadiumDTO), HttpStatus.CREATED);
    }

    //Put
    @PutMapping("/stadium/{id}")
    public ResponseEntity<?> updateStadiumById(@Valid @PathVariable Long id, @RequestBody StadiumDTO stadiumDTO) throws ApiException {
        return new ResponseEntity<>(stadiumServiceImp.updateStadiumById(id, stadiumDTO), HttpStatus.OK);
    }

    //Delete
    @DeleteMapping("/stadium/{id}")
    public ResponseEntity<?> deleteStadium(@PathVariable Long id) throws ApiException {
        return new ResponseEntity<>(stadiumServiceImp.deleteStadiumById(id), HttpStatus.OK);
    }
}
