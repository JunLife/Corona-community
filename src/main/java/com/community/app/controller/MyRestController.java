package com.community.app.controller;

import com.community.app.model.Post;
import com.community.app.repository.PostRepository;
import com.community.app.service.AuthService;
import com.community.app.service.MemberDetailsService;
import com.community.app.service.PostService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MyRestController {

    private final PostService postService;
    private final PostRepository postRepository;
    private final MemberDetailsService memberDetailsService;

    public MyRestController(PostService postService, PostRepository postRepository, AuthService authService, MemberDetailsService memberDetailsService) {
        this.postService = postService;
        this.postRepository = postRepository;
        this.memberDetailsService = memberDetailsService;
    }

    @GetMapping(path = "/")
    public HttpEntity home1() {
        for (int i = 0; i < 100; i++) {
            Post post = new Post();
            post.setTitle(i + " 번째 글");
            post.setText(i + " 번째 내용");
            post.setMember(memberDetailsService.getMemberByEmail("alswns9288@gmail.com"));
            postRepository.save(post);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path = "/adminTest")
    public String test1() {
        return "adminTest";
    }
}
