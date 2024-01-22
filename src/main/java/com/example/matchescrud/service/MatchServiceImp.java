package com.example.matchescrud.service;

import com.example.matchescrud.Mapper.MatchRequestMapper;
import com.example.matchescrud.Mapper.MatchResponseDTOMapper;
import com.example.matchescrud.dto.request.MatchRequestDTO;
import com.example.matchescrud.dto.response.MatchResponseDTO;
import com.example.matchescrud.exceptions.ApiException;
import com.example.matchescrud.exceptions.NotFoundExceptions.MatchNotFoundException;
import com.example.matchescrud.exceptions.NotFoundExceptions.TeamNotFoundException;
import com.example.matchescrud.exceptions.StadiumSizeException;
import com.example.matchescrud.model.entity.Match;
import com.example.matchescrud.model.entity.Team;
import com.example.matchescrud.repository.MatchRepository;
import com.example.matchescrud.repository.TeamRepository;
import com.example.matchescrud.service.interfaces.IMatchService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MatchServiceImp implements IMatchService {

    //Dependency injection
    MatchRepository matchRepository;
    TeamRepository teamRepository;
    MatchResponseDTOMapper matchResponseDTOMapper;
    MatchRequestMapper matchRequestMapper;
    public MatchServiceImp(MatchRepository matchRepository, TeamRepository teamRepository, MatchRequestMapper matchRequestMapper, MatchResponseDTOMapper matchResponseDTOMapper){
        this.matchRepository = matchRepository;
        this.teamRepository = teamRepository;
        this.matchRequestMapper = matchRequestMapper;
        this.matchResponseDTOMapper = matchResponseDTOMapper;
    }

    //GET
    @Transactional
    @Override
    public List<MatchResponseDTO> getAllMatches() {
        List<Match> matches = matchRepository.findAll();
        return matchResponseDTOMapper.matchListToMatchResponseDTOList(matches);
    }

    //GET
    @Transactional
    @Override
    public MatchResponseDTO getMatchByUUID(UUID uuid) throws ApiException {
        Match match = matchRepository.findById(uuid).orElseThrow(() -> new MatchNotFoundException(uuid));
        return matchResponseDTOMapper.matchToMatchResponseDTO(match);
    }

    //DELETE
    @Transactional
    @Override
    public MatchResponseDTO deleteMatch(UUID id) throws ApiException {
        Optional<Match> match = matchRepository.findById(id);
        if (match.isPresent()) {
            matchRepository.delete(match.get());
            return matchResponseDTOMapper.matchToMatchResponseDTO(match.get());
        }
        throw new MatchNotFoundException(id);
    }

    //POST
    @Transactional
    @Override
    public MatchResponseDTO createMatch(MatchRequestDTO matchRequestDTO) throws ApiException {
        // Map MatchRequestDTO to Match
        Match match = matchRequestMapper.matchRequestDTOtoMatch(matchRequestDTO);

        //Search matches by their ID on th DB
        Optional<Team> optionalHomeTeam = teamRepository.findById(match.getHomeTeam().getId());
        Optional<Team> optionalAwayTeam = teamRepository.findById(match.getAwayTeam().getId());

        Team homeTeam = optionalHomeTeam.orElseThrow(() -> new TeamNotFoundException(match.getHomeTeam().getId()));
        Team awayTeam = optionalAwayTeam.orElseThrow(() -> new TeamNotFoundException(match.getAwayTeam().getId()));

        //Set Random UUID
        match.setUuid(UUID.randomUUID());
        //Set HomeTeam stadium as match stadium
        if(match.getSpectators() > homeTeam.getStadium().getCapacity()){
            throw new StadiumSizeException(match.getSpectators(), homeTeam.getStadium());
        }
        match.setStadium(homeTeam.getStadium());
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setTime(matchRequestDTO.getTime());
        match.setDate(matchRequestDTO.getDate());
        match.setHomeGoals(matchRequestDTO.getHomeGoals());
        match.setAwayGoals(matchRequestDTO.getAwayGoals());
        //Converts spectators number to BigDecimal
        BigDecimal spectatorsBigDecimal = BigDecimal.valueOf(matchRequestDTO.getSpectators());
        // Calculates match revenue multipliying spectators by TicketPrice
        match.setRevenue(spectatorsBigDecimal.multiply(matchRequestDTO.getTicketPrice()));


        Match matchResponse = matchRepository.save(match);

        //Add match to HomeTeam and AwayTeam match lists.
        addMatchToTeams(homeTeam, awayTeam, matchResponse);
        return matchResponseDTOMapper.matchToMatchResponseDTO(matchResponse);

    }

    public void addMatchToTeams(Team homeTeam, Team awayTeam, Match match){
        homeTeam.getHomeMatches().add(match);
        awayTeam.getAwayMatches().add(match);
    }
}
