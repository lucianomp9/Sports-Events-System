package com.example.matchescrud.exceptions.AlreadyExistException;

import com.example.matchescrud.exceptions.ApiException;
import org.springframework.http.HttpStatus;

public class StadiumAlreadyExist extends ApiException {
    public StadiumAlreadyExist(String name) {
        super("Stadium with name: " + name + " already exists", HttpStatus.CONFLICT);

    }
}
