package com.example.matchescrud.dto.request;

import com.example.matchescrud.model.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MatchRequestDTO {
    private int spectators;
    private LocalDate date;
    private LocalTime time;
    private Team homeTeam;
    private Team awayTeam;
    private int homeGoals;
    private int awayGoals;
    private BigDecimal ticketPrice;
}
