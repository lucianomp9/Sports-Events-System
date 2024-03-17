package com.example.matchescrud.service;

import com.example.matchescrud.Mapper.CityMapper;
import com.example.matchescrud.Mapper.DivisionMapper;
import com.example.matchescrud.Mapper.StadiumMapper;
import com.example.matchescrud.Mapper.TeamMapper;
import com.example.matchescrud.dto.CityDTO;
import com.example.matchescrud.dto.DivisionDTO;
import com.example.matchescrud.dto.StadiumDTO;
import com.example.matchescrud.dto.TeamDTO;
import com.example.matchescrud.exceptions.AlreadyExistException.TeamAlreadyExist;
import com.example.matchescrud.exceptions.ApiException;
import com.example.matchescrud.exceptions.NotFoundExceptions.CityNotFoundException;
import com.example.matchescrud.exceptions.NotFoundExceptions.TeamNotFoundException;
import com.example.matchescrud.model.entity.*;
import com.example.matchescrud.repository.TeamRepository;
import com.example.matchescrud.service.interfaces.ITeamService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeamServiceImp implements ITeamService {


    //Dependency inyection
    TeamRepository teamRepository;
    TeamMapper teamMapper;
    CityMapper cityMapper;
    StadiumMapper stadiumMapper;
    DivisionMapper divisionMapper;
    StadiumServiceImp stadiumServiceImp;
    DivisionServiceImp divisionServiceImp;
    CityServiceImp cityServiceImp;
    public TeamServiceImp(TeamRepository teamRepository, TeamMapper teamMapper, StadiumServiceImp stadiumServiceImp,
                          DivisionServiceImp divisionServiceImp, CityServiceImp cityServiceImp, DivisionMapper divisionMapper, StadiumMapper stadiumMapper, CityMapper cityMapper) {
        //Repository
        this.teamRepository = teamRepository;
        //Service
        this.cityServiceImp = cityServiceImp;
        this.stadiumServiceImp = stadiumServiceImp;
        this.divisionServiceImp = divisionServiceImp;
        //Mappers
        this.teamMapper = teamMapper;
        this.cityMapper = cityMapper;
        this.stadiumMapper = stadiumMapper;
        this.divisionMapper = divisionMapper;
    }


    //POST
    @Transactional
    @Override
    public TeamDTO createTeam(TeamDTO teamDTO) throws ApiException{
        // Converts TeamDTO a Team
        Team team = new Team();
        Division division = new Division();
        City city = new City();
        Stadium stadium = new Stadium();
        Optional<Team> optionalTeam = teamRepository.findByName(teamDTO.getName());

        if(optionalTeam.isPresent()){
            throw new TeamAlreadyExist(optionalTeam.get().getName());
        }

        //Set attributes via object ID or creates a new one
        if( teamDTO.getDivision().getId() != null){
             division = divisionMapper.divisionDTOToDivision(divisionServiceImp.getDivisionById(teamDTO.getDivision().getId()));
        }else{
             division = divisionMapper.divisionDTOToDivision(divisionServiceImp.createDivision(teamDTO.getDivision()));
        }
        if( teamDTO.getCity().getId() != null){
            city = cityMapper.cityDTOToCity(cityServiceImp.getCityById(teamDTO.getCity().getId()));
        }else{
            city = cityMapper.cityDTOToCity(cityServiceImp.createCity(teamDTO.getCity()));
        }
        if( teamDTO.getStadium().getId() != null){
            stadium = stadiumMapper.stadiumDTOToStadium(stadiumServiceImp.getStadiumById(teamDTO.getStadium().getId()));
        }else{
            stadium = stadiumMapper.stadiumDTOToStadium(stadiumServiceImp.createStadium(teamDTO.getStadium()));
        }

        team.setName(teamDTO.getName());
        team.setDivision(division);
        team.setCity(city);
        team.setStadium(stadium);
        //Initialize empty matches list
        List<Match> awayMatches = new ArrayList<>();
        List<Match> homeMatches = new ArrayList<>();
        team.setHomeMatches(homeMatches);
        team.setAwayMatches(awayMatches);

        // Save Team in DB
        return teamMapper.teamToTeamDTO(teamRepository.save(team));

    }

    //GET
    @Transactional
    @Override
    public List<TeamDTO> getAllTeams() {
        List<Team> teams = teamRepository.findAll();
        return teamMapper.teamListToTeamDTOList(teams);
    }

    //GET
    @Transactional
    @Override
    public TeamDTO getTeamById(Long id) throws ApiException {
        Team team = teamRepository.findById(id).orElseThrow(() -> new TeamNotFoundException(id));
        System.out.println((team));
        return teamMapper.teamToTeamDTO(team);
    }

    //GET
    @Transactional
    @Override
    public List<TeamDTO> getTeamsByCityId(Long id) throws ApiException {
        List<Team> teams = teamRepository.findAll();
        List<TeamDTO> teamDTOS = teams.stream()
                .filter(team -> team.getCity() != null && team.getCity().getId().equals(id))
                .map(teamMapper::teamToTeamDTO)
                .collect(Collectors.toList());
        if (teamDTOS.isEmpty()) {
            throw new CityNotFoundException(id);
        }
        return teamDTOS;
    }

    @Transactional
    @Override
    public TeamDTO updateTeamById(Long id, TeamDTO teamDTO) throws ApiException {
        Optional<Team> teamOptional = teamRepository.findById(id);

        if (teamOptional.isPresent()) {
            Team existingTeam = teamOptional.get();

            // If objects ID are sent in JSON, set attributes via ID.


            if (teamDTO != null) {
                if(teamDTO.getName() != null){
                existingTeam.setName(teamDTO.getName());
                }
                if(teamDTO.getCity() != null){
                    if (teamDTO.getCity().getId() != null) {
                        CityDTO cityDTO = cityServiceImp.getCityById(teamDTO.getCity().getId());
                        existingTeam.setCity(cityMapper.cityDTOToCity(cityDTO));
                    } else if(teamDTO.getCity().getName() != null){
                        existingTeam.setCity(cityMapper.cityDTOToCity(cityServiceImp.createCity(teamDTO.getCity())));
                    }
                }
                if(teamDTO.getStadium() != null){
                    if (teamDTO.getStadium().getId() != null) {
                        StadiumDTO stadiumDTO = stadiumServiceImp.getStadiumById(teamDTO.getStadium().getId());
                        existingTeam.setStadium(stadiumMapper.stadiumDTOToStadium(stadiumDTO));
                    } else if(teamDTO.getStadium().getName() != null){
                        existingTeam.setStadium(stadiumMapper.stadiumDTOToStadium(stadiumServiceImp.createStadium(teamDTO.getStadium())));
                    }
                }
                if(teamDTO.getDivision() != null){
                    if (teamDTO.getDivision().getId() != null) {
                        DivisionDTO divisionDTO = divisionServiceImp.getDivisionById(teamDTO.getDivision().getId());
                        existingTeam.setDivision(divisionMapper.divisionDTOToDivision(divisionDTO));
                    } else if(teamDTO.getDivision().getName() != null){
                        existingTeam.setDivision(divisionMapper.divisionDTOToDivision(divisionServiceImp.createDivision(teamDTO.getDivision())));
                    }
                }


                return teamMapper.teamToTeamDTO(teamRepository.save(existingTeam));
            }
        }
        throw new TeamNotFoundException(id);

    }

    //DELETE
    @Transactional
    @Override
    public TeamDTO deleteTeamById(Long id) throws ApiException {
        //Verifies if team exists, if not, throws TeamNotFoundException
        Optional<Team> teamOptional = teamRepository.findById(id);
        if(teamOptional.isPresent()){
            //Deletes team from DB
            teamRepository.delete(teamOptional.get());
            return teamMapper.teamToTeamDTO(teamOptional.get());
        }
        throw new TeamNotFoundException(id);
    }
}

