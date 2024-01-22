package com.example.matchescrud.Mapper;

import com.example.matchescrud.dto.StadiumDTO;
import com.example.matchescrud.model.entity.Stadium;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface StadiumMapper {
    StadiumDTO stadiumToStadiumDTO(Stadium stadium);
    Stadium stadiumDTOToStadium(StadiumDTO stadiumDTO);
    List<StadiumDTO> stadiumListToStadiumDTOList(List<Stadium> stadiums);


}
