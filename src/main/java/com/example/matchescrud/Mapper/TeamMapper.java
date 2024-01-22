package com.example.matchescrud.Mapper;

import com.example.matchescrud.dto.TeamDTO;
import com.example.matchescrud.model.entity.Team;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TeamMapper {
    TeamDTO teamToTeamDTO(Team team);
    Team teamDTOToTeam(TeamDTO teamDto);
    List<TeamDTO> teamListToTeamDTOList(List<Team> teamList);
}
