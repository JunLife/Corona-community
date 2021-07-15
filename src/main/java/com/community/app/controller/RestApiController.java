package com.community.app.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestApiController {

    @GetMapping(path = "/")
    public HttpEntity home() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/login")
    public HttpEntity login() {
        return new ResponseEntity(HttpStatus.OK);
    }
}
