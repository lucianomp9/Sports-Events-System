package com.example.matchescrud.service.interfaces;

import com.example.matchescrud.dto.CityDTO;
import com.example.matchescrud.exceptions.ApiException;

import java.util.List;

public interface ICityService {
    //Get
    List<CityDTO> getAllCity();
    CityDTO getCityById(Long id) throws ApiException;

    //Put
    CityDTO updateCityById(Long id, CityDTO cityDTO) throws ApiException;

    //Post
    CityDTO createCity(CityDTO cityDTO) throws ApiException;

    //Delete
    CityDTO deleteCityById(Long id) throws ApiException;
}
