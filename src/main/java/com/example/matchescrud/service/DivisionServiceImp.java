package com.example.matchescrud.service;

import com.example.matchescrud.Mapper.DivisionMapper;
import com.example.matchescrud.dto.DivisionDTO;
import com.example.matchescrud.exceptions.AlreadyExistException.DivisionAlreadyExist;
import com.example.matchescrud.exceptions.ApiException;
import com.example.matchescrud.exceptions.NotFoundExceptions.DivisionNotFoundException;
import com.example.matchescrud.model.entity.Division;
import com.example.matchescrud.repository.DivisionRepository;
import com.example.matchescrud.service.interfaces.IDivisionService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DivisionServiceImp implements IDivisionService {

    //Dependency inyection
    DivisionMapper divisionMapper;
    DivisionRepository divisionRepository;
    public DivisionServiceImp (DivisionRepository divisionRepository, DivisionMapper divisionMapper){
        this.divisionMapper = divisionMapper;
        this.divisionRepository = divisionRepository;
    }

    //GET
    @Transactional
    @Override
    public List<DivisionDTO> getAllDivision() {
        List<Division> divisions = divisionRepository.findAll();
        return divisionMapper.divisionListToDivisionDTOList(divisions);
    }

    //GET
    @Transactional
    @Override
    public DivisionDTO getDivisionById(Long id) throws ApiException {
        Division division = divisionRepository.findById(id).orElseThrow(()-> new DivisionNotFoundException(id));
        return divisionMapper.divisionToDivisionDTO(division);
    }

    //PUT
    @Transactional
    @Override
    public DivisionDTO updateDivisionById(Long id, DivisionDTO divisionDTO) throws ApiException {
        Optional<Division> divisionOptional = divisionRepository.findById(id);

        return divisionOptional.map(existingDivision  -> {
            existingDivision.setName(divisionDTO.getName());

            divisionRepository.save(existingDivision);
            return divisionMapper.divisionToDivisionDTO(existingDivision);
        }).orElseThrow(() -> new DivisionNotFoundException(id));
    }

    //POST
    @Transactional
    @Override
    public DivisionDTO createDivision(DivisionDTO divisionDTO) throws ApiException {
        // Converts TeamDTO a Team
        Division division = divisionMapper.divisionDTOToDivision(divisionDTO);

        Optional<Division> optionalDivision = divisionRepository.findByName(division.getName());

        if(optionalDivision.isPresent()){
            throw new DivisionAlreadyExist(optionalDivision.get().getName());
        }
        divisionRepository.save(division);
        return divisionMapper.divisionToDivisionDTO(division);
    }

    //DELETE
    @Transactional
    @Override
    public DivisionDTO deleteDivisionById(Long id) throws ApiException {
        //Verifies if division exists, if not, throws DivisionNotFoundException
        Optional<Division> optionalDivision = divisionRepository.findById(id);

        if(optionalDivision.isPresent()){
            //Deletes division from DB
            divisionRepository.delete(optionalDivision.get());
            return divisionMapper.divisionToDivisionDTO(optionalDivision.get());
        }
        throw new DivisionNotFoundException(id);
    }

}
