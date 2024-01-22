package com.example.matchescrud.exceptions.NotFoundExceptions;

import com.example.matchescrud.exceptions.ApiException;
import org.springframework.http.HttpStatus;

public class TeamNotFoundException extends ApiException {
    public TeamNotFoundException(Long id){
        super("No team was found with id " + id, HttpStatus.NOT_FOUND);
    }

}
