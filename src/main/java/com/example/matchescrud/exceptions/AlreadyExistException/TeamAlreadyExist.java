package com.example.matchescrud.exceptions.AlreadyExistException;

import com.example.matchescrud.exceptions.ApiException;
import org.springframework.http.HttpStatus;

public class TeamAlreadyExist extends ApiException {
    public TeamAlreadyExist(String name){
        super("Team with name: " + name + " already exists", HttpStatus.CONFLICT);
    }

}
