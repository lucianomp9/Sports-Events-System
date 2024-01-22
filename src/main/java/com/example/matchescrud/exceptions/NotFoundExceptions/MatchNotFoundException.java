package com.example.matchescrud.exceptions.NotFoundExceptions;

import com.example.matchescrud.exceptions.ApiException;
import org.springframework.http.HttpStatus;

import java.util.UUID;

public class MatchNotFoundException extends ApiException {
    public MatchNotFoundException(UUID uuid){
        super("No match was found with UUID " + uuid, HttpStatus.NOT_FOUND);
    }
}

