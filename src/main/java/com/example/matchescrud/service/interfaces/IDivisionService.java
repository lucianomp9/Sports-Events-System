package com.example.matchescrud.service.interfaces;

import com.example.matchescrud.dto.DivisionDTO;
import com.example.matchescrud.exceptions.ApiException;

import java.util.List;

public interface IDivisionService {
    //Get
    List<DivisionDTO> getAllDivision();
    DivisionDTO getDivisionById(Long id) throws ApiException;

    //Put
    DivisionDTO updateDivisionById(Long id, DivisionDTO divisionDTO) throws ApiException;

    //Post
    DivisionDTO createDivision(DivisionDTO divisionDTO) throws ApiException;

    //Delete
    DivisionDTO deleteDivisionById(Long id) throws ApiException;
}
