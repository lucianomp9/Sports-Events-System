package com.example.matchescrud.exceptions.AlreadyExistException;

import com.example.matchescrud.exceptions.ApiException;
import org.springframework.http.HttpStatus;

public class CityAlreadyExist extends ApiException {
    public CityAlreadyExist(String name){
        super("City with name: " + name + " already exists", HttpStatus.CONFLICT);
    }
}
