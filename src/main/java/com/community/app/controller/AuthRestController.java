package com.community.app.controller;

import com.community.app.model.Member;
import com.community.app.service.AuthService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class AuthRestController {
    private AuthService authService;

    public AuthRestController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(path = "/signup")
    public HttpEntity signup(@RequestBody Member member) {
        authService.signup(member);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping(path = "/login")
    public ResponseEntity login() {
        return new ResponseEntity(authService.getLoginMember(), HttpStatus.OK);
    }

    @PostMapping(path = "/logout")
    public HttpEntity logout(HttpServletResponse response) {
        authService.removeCookie(response);
        return new ResponseEntity(HttpStatus.OK);
    }
}
