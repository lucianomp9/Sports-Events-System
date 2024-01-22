package com.example.matchescrud.Mapper;

import com.example.matchescrud.dto.DivisionDTO;
import com.example.matchescrud.model.entity.Division;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface DivisionMapper {
    DivisionDTO divisionToDivisionDTO(Division division);
    Division divisionDTOToDivision(DivisionDTO divisionDTO);
    List<DivisionDTO> divisionListToDivisionDTOList(List<Division> divisionList);
}
