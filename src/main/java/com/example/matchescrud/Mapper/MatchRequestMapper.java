package com.example.matchescrud.Mapper;

import com.example.matchescrud.dto.request.MatchRequestDTO;
import com.example.matchescrud.model.entity.Match;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MatchRequestMapper {

    Match matchRequestDTOtoMatch(MatchRequestDTO matchRequestDTO);
    MatchRequestDTO matchToMatchRequestDTO(Match match);
    List<MatchRequestDTO> matchListToMatchRequestDTOList(List<Match> matches);
}
