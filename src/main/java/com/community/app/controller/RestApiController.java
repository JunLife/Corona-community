package com.community.app.controller;

import com.community.app.utilities.CookieUtil;
import com.community.app.utilities.JWTUtil;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

@RestController
public class RestApiController {
    private final CookieUtil cookieUtil;
    private final JWTUtil jwtUtil;

    public RestApiController(CookieUtil cookieUtil, JWTUtil jwtUtil) {
        this.cookieUtil = cookieUtil;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping(path = "/")
    public String home() {
        return "{\"name\": 3}";
        //        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/login")
    public HttpEntity login() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/logout")
    public HttpEntity logout() {
        return new ResponseEntity(HttpStatus.OK);
    }
}
