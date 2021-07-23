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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class RestApiController {

    private final MemberDetailsService memberDetailsService;
    private final PostService postService;

    public RestApiController(MemberDetailsService memberDetailsService, PostService postService) {
        this.memberDetailsService = memberDetailsService;
        this.postService = postService;
    }

    @GetMapping(path = "/")
    public Member home() {
//        List<Post> posts = postService.getPostsBymemberEmail();
//        return posts;

        Member member = postService.findMemberByPostId(Long.valueOf(2));
        return member;
    }

    @PostMapping(path = "/signup")
    public HttpEntity signup(@RequestBody Member member) {
        memberDetailsService.signup(member);

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
    public HttpEntity post(@RequestParam("email") String memberEmail,
                           @RequestParam(name = "file", required = false) MultipartFile file,
                           @RequestParam("title") String title,
                           @RequestParam("text") String text,
                           Post post) throws Exception {

        post.setTitle(title);
        post.setTitle(text);
        postService.save(post, memberEmail, file);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping(path = "/adminTest")
    public String test1() {
        return "adminTest";
    }
}
