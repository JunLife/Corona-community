package com.community.app.controller;

import com.community.app.config.Role;
import com.community.app.model.Member;
import com.community.app.model.Post;
import com.community.app.repository.MemberRepository;
import com.community.app.service.MemberDetailsService;
import com.community.app.service.PostService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class RestApiController {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberDetailsService memberDetailsService;
    private final PostService postService;

    public RestApiController(MemberRepository memberRepository,
                             PasswordEncoder passwordEncoder,
                             MemberDetailsService memberDetailsService, PostService postService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.memberDetailsService = memberDetailsService;
        this.postService = postService;
    }

    @GetMapping(path = "/")
    public List<Member> home() {
        Member member = new Member();
        member.setEmail("user1");
        member.setPassword(passwordEncoder.encode("password"));
        member.setRole(Role.ROLE_MEMBER);
        member.setAge(20);
        memberRepository.save(member);

        member = new Member();
        member.setEmail("user2");
        member.setPassword(passwordEncoder.encode("password"));
        member.setRole(Role.ROLE_ADMIN);
        member.setAge(20);
        memberRepository.save(member);

        Member member1;
        member1 = memberRepository.findByEmail("user1");

        List<Member> members = memberRepository.findAll();
        return members;
    }

    @PostMapping(path = "/signup")
    public HttpEntity signup(@RequestBody Member member) {
        memberDetailsService.saveMember(member);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping(path = "/login")
    public HttpEntity login() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/logout")
    public HttpEntity logout() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/post")
    public HttpEntity post(@RequestParam("email") String userEmail,
                           @RequestParam(name = "file", required = false) MultipartFile file,
                           @RequestParam("title") String title,
                           @RequestParam("text") String text,
                           Post post) throws Exception {

        post.setTitle(title);
        post.setTitle(text);
        postService.save(post, userEmail, file);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping(path = "/adminTest")
    public String test1() {
        return "adminTest";
    }
}
