package com.example.matchescrud.exceptions.AlreadyExistException;

import com.example.matchescrud.exceptions.ApiException;
import org.springframework.http.HttpStatus;

public class DivisionAlreadyExist extends ApiException {
    public DivisionAlreadyExist(String name){
        super("Division with name: " + name + " already exists", HttpStatus.CONFLICT);
    }
}
