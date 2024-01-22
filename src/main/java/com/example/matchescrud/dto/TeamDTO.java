package com.example.matchescrud.dto;

import com.example.matchescrud.dto.response.MatchResponseDTO;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class TeamDTO {
    private Long id;
    private String name;
    private DivisionDTO division;
    private CityDTO city;
    private StadiumDTO stadium;
    private List<MatchResponseDTO> homeMatches;
    private List<MatchResponseDTO> awayMatches;
}
