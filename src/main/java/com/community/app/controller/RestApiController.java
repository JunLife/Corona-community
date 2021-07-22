package com.community.app.controller;

import com.community.app.config.Role;
import com.community.app.model.Member;
import com.community.app.repository.MemberRopository;
import com.community.app.utilities.CookieUtil;
import com.community.app.utilities.JWTUtil;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestApiController {
    private final CookieUtil cookieUtil;
    private final JWTUtil jwtUtil;
    private final MemberRopository memberRopository;
    private final PasswordEncoder passwordEncoder;

    public RestApiController(CookieUtil cookieUtil, JWTUtil jwtUtil, MemberRopository memberRopository, PasswordEncoder passwordEncoder) {
        this.cookieUtil = cookieUtil;
        this.jwtUtil = jwtUtil;
        this.memberRopository = memberRopository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping(path = "/")
    public List<Member> home() {
        Member member = new Member();
        member.setEmail("user1");
        member.setPassword(passwordEncoder.encode("password"));
        member.setRole(Role.ROLE_MEMBER);
        member.setAge(20);
        memberRopository.save(member);

        member = new Member();
        member.setEmail("user2");
        member.setPassword(passwordEncoder.encode("password"));
        member.setRole(Role.ROLE_ADMIN);
        member.setAge(20);
        memberRopository.save(member);

        Member member1;
        member1 = memberRopository.findByEmail("user1");
        System.out.println(member1.getEmail());

        List<Member> members = memberRopository.findAll();
        return members;
    }

    @PostMapping(path = "/login")
    public HttpEntity login() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/logout")
    public HttpEntity logout() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path = "/test1")
    public String test1() {
        return "test1";
    }

    @GetMapping(path = "/test2")
    public String test2() {
        return "test2";
    }
}
