package com.community.app.controller;

import com.community.app.jwt.JWTAuthenticationRequest;
import com.community.app.model.Post;
import com.community.app.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
public class BoardAndPostRestController {

    private PostService postService;

    public BoardAndPostRestController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(path = "/board")
    public Page<Post> getBoard(Pageable pageable) {
        return postService.findAll(pageable);
    }

    @GetMapping(path = "/board/search")
    public Page<Post> searchBoard(Pageable pageable, String keyword) {
        return postService.findAllByKeyword(pageable, keyword);
    }

    @GetMapping(path = "/board/detail/{id}")
    public Post getPost(@PathVariable("id") Long id) {
        return postService.findById(id);
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
        postService.save(post, memberEmail, file);
        return new ResponseEntity(HttpStatus.CREATED);
    }
}

