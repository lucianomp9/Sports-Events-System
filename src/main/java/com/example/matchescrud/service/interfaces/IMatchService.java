package com.example.matchescrud.service.interfaces;


import com.example.matchescrud.dto.request.MatchRequestDTO;
import com.example.matchescrud.dto.response.MatchResponseDTO;
import com.example.matchescrud.exceptions.ApiException;

import java.util.List;
import java.util.UUID;

public interface IMatchService {

    //Get
    List<MatchResponseDTO> getAllMatches();
    MatchResponseDTO getMatchByUUID(UUID uuid) throws ApiException;

    //Post
    MatchResponseDTO createMatch(MatchRequestDTO matchRequestDTO) throws ApiException;

    //Delete Match
    MatchResponseDTO deleteMatch(UUID id) throws ApiException;
}
