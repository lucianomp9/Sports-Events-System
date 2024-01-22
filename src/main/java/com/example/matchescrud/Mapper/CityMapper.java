package com.example.matchescrud.Mapper;

import com.example.matchescrud.dto.CityDTO;
import com.example.matchescrud.model.entity.City;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CityMapper {
    CityDTO cityToCityDTO(City city);
    City cityDTOToCity(CityDTO cityDTO);
    List<CityDTO> cityListToCityDTOList(List<City> cities);
}
