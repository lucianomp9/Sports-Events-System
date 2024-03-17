package com.example.matchescrud.service;

import com.example.matchescrud.Mapper.CityMapper;
import com.example.matchescrud.dto.CityDTO;
import com.example.matchescrud.exceptions.AlreadyExistException.CityAlreadyExist;
import com.example.matchescrud.exceptions.ApiException;
import com.example.matchescrud.exceptions.NotFoundExceptions.CityNotFoundException;
import com.example.matchescrud.model.entity.City;
import com.example.matchescrud.repository.CityRepository;
import com.example.matchescrud.service.interfaces.ICityService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImp implements ICityService {

    //Dependency injection
    CityRepository cityRepository;
    CityMapper cityMapper;
    public CityServiceImp(CityRepository cityRepository, CityMapper cityMapper){
        this.cityMapper = cityMapper;
        this.cityRepository = cityRepository;
    }

    //GET
    @Transactional
    @Override
    public List<CityDTO> getAllCity() {
        List<City> cities = cityRepository.findAll();
        return cityMapper.cityListToCityDTOList(cities);
    }

    //GET
    @Transactional
    @Override
    public CityDTO getCityById(Long id) throws ApiException {
        City city = cityRepository.findById(id).orElseThrow(()-> new CityNotFoundException(id));
        return cityMapper.cityToCityDTO(city);
    }

    //PUT
    @Transactional
    @Override
    public CityDTO updateCityById(Long id, CityDTO cityDTO) throws ApiException {
        Optional<City> cityOptional = cityRepository.findById(id);

        return cityOptional.map(existingCity  -> {
            existingCity.setName(cityDTO.getName());

            cityRepository.save(existingCity);
            return cityMapper.cityToCityDTO(existingCity);
        }).orElseThrow(() -> new CityNotFoundException(id));
    }

    //POST
    @Transactional
    @Override
    public CityDTO createCity(CityDTO cityDTO) throws ApiException {
        // Converts TeamDTO a Team
        City city = cityMapper.cityDTOToCity(cityDTO);

        Optional<City> optionalCity = cityRepository.findByName(city.getName());

        if(optionalCity.isPresent()){
            throw new CityAlreadyExist(optionalCity.get().getName());
        }
        cityRepository.save(city);
        return cityMapper.cityToCityDTO(city);
    }

    //DELETE
    @Transactional
    @Override
    public CityDTO deleteCityById(Long id) throws ApiException {
        //Verifies if city exists, if not, throws CityNotFoundException
        Optional<City> optionalCity = cityRepository.findById(id);
        if(optionalCity.isPresent()){
            //Deletes city from DB
            cityRepository.delete(optionalCity.get());
            return cityMapper.cityToCityDTO(optionalCity.get());
        }
        throw new CityNotFoundException(id);
    }


}
