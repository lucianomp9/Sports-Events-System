package com.example.matchescrud.controller;


import com.example.matchescrud.dto.request.MatchRequestDTO;
import com.example.matchescrud.dto.response.MatchResponseDTO;
import com.example.matchescrud.exceptions.ApiException;
import com.example.matchescrud.service.MatchServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("http://localhost:4200")
public class MatchController {

    //Dependency injection
    MatchServiceImp matchServiceImp;
    public MatchController(MatchServiceImp matchServiceImp){
        this.matchServiceImp = matchServiceImp;
    }

    //Get all matches
    @GetMapping("/match")
    public ResponseEntity<List<MatchResponseDTO>> getAllMatches(){
        return new ResponseEntity<>(matchServiceImp.getAllMatches(), HttpStatus.OK);
    }

    //Get match by UUID
    @GetMapping("/match/{uuid}")
    public ResponseEntity<MatchResponseDTO> getMatchByUUID(@PathVariable UUID uuid) throws ApiException {
        return new ResponseEntity<>(matchServiceImp.getMatchByUUID(uuid), HttpStatus.OK);
    }


    //Delete match
    @DeleteMapping("/match/{uuid}")
    public ResponseEntity<?> deleteMatch(@PathVariable UUID uuid) throws ApiException {
        return new ResponseEntity<>(matchServiceImp.deleteMatch(uuid), HttpStatus.OK);
    }

    //Create match
    @PostMapping("/match")
    public ResponseEntity<?> createMatch(@Valid @RequestBody MatchRequestDTO matchRequestDTO) throws ApiException {
        return new ResponseEntity<>(matchServiceImp.createMatch(matchRequestDTO), HttpStatus.CREATED);
    }
}
