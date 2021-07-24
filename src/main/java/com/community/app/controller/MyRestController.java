package com.community.app.controller;

import com.community.app.model.Post;
import com.community.app.service.PostService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class MyRestController {

    private final PostService postService;

    public MyRestController(PostService postService) {
        this.postService = postService;
     }

    @GetMapping(path = "/")
    public HttpEntity home1() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path = "/posts/{memberEmail}")
    public List<Post> home(@PathVariable("memberEmail") String memberEmail) {
        List<Post> posts = postService.getPostsByMemberEmail(memberEmail);

        return posts;
    }

    @PostMapping(path = "/post")
    public HttpEntity post(@RequestParam(name = "file", required = false) MultipartFile file,
                           String memberEmail,
                           Post post) {
        System.out.println(memberEmail);
        postService.save(post, memberEmail, file);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping(path = "/post/{postId}/")
    public HttpEntity getPost(@PathVariable("postId") Long postId) {

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path = "/adminTest")
    public String test1() {
        return "adminTest";
    }
}
