package com.example.matchescrud.controller;

import com.example.matchescrud.dto.TeamDTO;
import com.example.matchescrud.exceptions.ApiException;
import com.example.matchescrud.service.TeamServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("http://localhost:4200")
public class TeamController {

    //Dependency inyection
    TeamServiceImp teamServiceImp;
    public TeamController(TeamServiceImp teamServiceImp){
        this.teamServiceImp = teamServiceImp;
    }


    //Get all teams from DB
    @GetMapping("/team")
    public ResponseEntity<List<TeamDTO>> getAll(){
        return new ResponseEntity<>(teamServiceImp.getAllTeams(), HttpStatus.OK);
    }

    //Get teams by their ID
    @GetMapping("/team/{id}")
    public ResponseEntity<TeamDTO> getTeam(@PathVariable Long id) throws ApiException {
        return new ResponseEntity<>(teamServiceImp.getTeamById(id), HttpStatus.OK);
    }

    //Get teams from an specific city id
    @GetMapping("/teamByCity/{id}")
    public ResponseEntity<List<TeamDTO>> getTeamByCity(@PathVariable Long id) throws ApiException {
        return new ResponseEntity<>(teamServiceImp.getTeamsByCityId(id), HttpStatus.OK);
    }

    //Update team
    @PutMapping("/team/{id}")
    public ResponseEntity<?> updateTeamById(@Valid @PathVariable Long id, @RequestBody TeamDTO teamDTO) throws ApiException{
        return new ResponseEntity<>(teamServiceImp.updateTeamById(id, teamDTO), HttpStatus.OK);
    }

    //Delete team
    @DeleteMapping("/team/{id}")
    public ResponseEntity<?> deleteTeam(@PathVariable Long id) throws ApiException {
        return new ResponseEntity<>(teamServiceImp.deleteTeamById(id), HttpStatus.OK);
    }

    //Create team
    @PostMapping("/team")
    public ResponseEntity<?> createTeam(@Valid @RequestBody TeamDTO teamDTO) throws ApiException{
        return new ResponseEntity<>(teamServiceImp.createTeam(teamDTO), HttpStatus.CREATED);
    }
}

