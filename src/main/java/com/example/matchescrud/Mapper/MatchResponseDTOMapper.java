package com.example.matchescrud.Mapper;

import com.example.matchescrud.dto.response.MatchResponseDTO;
import com.example.matchescrud.model.entity.Match;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MatchResponseDTOMapper {
    MatchResponseDTO matchToMatchResponseDTO(Match match);
    Match matchResponseDTOToMatch(MatchResponseDTO matchResponseDTO);
    List<MatchResponseDTO> matchListToMatchResponseDTOList(List<Match> match);
}
