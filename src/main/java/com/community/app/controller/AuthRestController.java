package com.community.app.controller;

import com.community.app.model.Member;
import com.community.app.service.AuthService;
import com.community.app.service.MemberDetailsService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
public class AuthRestController {
    private final AuthService authService;
    private final MemberDetailsService memberDetailsService;

    public AuthRestController(AuthService authService, MemberDetailsService memberDetailsService) {
        this.authService = authService;
        this.memberDetailsService = memberDetailsService;
    }

    @PostMapping(path = "/signup")
    public HttpEntity signup(@RequestBody Member member) {
        authService.signup(member);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping(path = "/checkEmail")
    public HttpEntity checkEmail(@RequestParam("email") String memberEmail) {
        authService.checkMember(memberEmail);
        return new ResponseEntity(HttpStatus.OK);
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

    @GetMapping(path = "/profile/{email}")
    public ResponseEntity getProfile(@PathVariable("email") String email) {
        return new ResponseEntity(memberDetailsService.getMemberByEmail(email), HttpStatus.OK);
    }

    @PutMapping(path = "/profile/{email}")
    public ResponseEntity mofidyProfile(@PathVariable("email") String email,
                                        @RequestBody Member member) {
        System.out.println(member.getFirstName());
        memberDetailsService.modifyProfile(member, email);
        return new ResponseEntity(HttpStatus.OK);
    }
}
