package com.example.matchescrud.service.interfaces;

import com.example.matchescrud.dto.TeamDTO;
import com.example.matchescrud.exceptions.ApiException;

import java.util.List;

public interface ITeamService {

    //Get
    TeamDTO getTeamById(Long id)throws ApiException;
    List<TeamDTO> getAllTeams();
    List<TeamDTO> getTeamsByCityId(Long id)throws ApiException;

    //Post
    TeamDTO createTeam(TeamDTO teamDTO) throws ApiException;

    //Put
   TeamDTO updateTeamById(Long id, TeamDTO teamDTO) throws ApiException;

    //Delete
    TeamDTO deleteTeamById(Long id) throws ApiException;
}
