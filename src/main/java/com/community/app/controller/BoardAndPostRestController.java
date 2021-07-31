package com.community.app.controller;

import com.community.app.model.Post;
import com.community.app.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class BoardAndPostRestController {

    private PostService postService;

    public BoardAndPostRestController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(path = "/board")
    public Page<Post> getBoard(@PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable) {
        return postService.findAll(pageable);
    }

    @GetMapping(path = "/board/search")
    public Page<Post> searchBoard(@PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable,
                                  String keyword) {
        return postService.findAllByKeyword(pageable, keyword);
    }

    @GetMapping(path = "/board/detail/{id}")
    public Post getPost(@PathVariable("id") Long id) {
        return postService.findPostById(id);
    }

    @GetMapping(path = "/posts/{memberEmail}")
    public List<Post> home(@PathVariable("memberEmail") String memberEmail) {
        List<Post> posts = postService.getPostsByMemberEmail(memberEmail);

        return posts;
    }

    @PostMapping(path = "/post/new")
    public HttpEntity post(@RequestParam(name = "file", required = false) MultipartFile file,
                           String memberEmail,
                           Post post) {
        postService.save(post, memberEmail, file);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/post/delete/{id}")
    public HttpEntity deletePost(@PathVariable("id") Long id) {
        postService.deletePost(id);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping(path = "/post/modify/{id}")
    public HttpEntity modifyPost(@RequestParam(name = "file", required = false) MultipartFile file,
                                 @RequestParam("title") String title,
                                 @RequestParam("text") String text,
                                 @PathVariable("id") Long id) {
        postService.modifyPost(id, file, title, text);

        return new ResponseEntity(HttpStatus.OK);
    }
}

