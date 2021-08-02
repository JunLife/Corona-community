package com.community.app.controller;

import com.community.app.model.Post;
import com.community.app.repository.PostRepository;
import com.community.app.service.MemberDetailsService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MyRestController {

    private final PostRepository postRepository;
    private final MemberDetailsService memberDetailsService;

    public MyRestController(PostRepository postRepository, MemberDetailsService memberDetailsService) {
        this.postRepository = postRepository;
        this.memberDetailsService = memberDetailsService;
    }

    // 더미 데이터 생성용
    @GetMapping(path = "/")
    public HttpEntity home() {
        for (int i = 0; i < 200; i++) {
            Post post = new Post();
            post.setTitle(i + " 번째 글");
            post.setText(i + " 번째 내용");
            if (i % 3 == 0) {
                post.setMember(memberDetailsService.getMemberByEmail("alswns9288@gmail.com"));
            } else if (i % 3 == 1) {
                post.setMember(memberDetailsService.getMemberByEmail("user1@gmail.com"));
            } else {
                post.setMember(memberDetailsService.getMemberByEmail("user2@gmail.com"));
            }

            postRepository.save(post);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path = "/grade")
    public String getGrade() {
        String photoData = memberDetailsService.getEncodedPhoto();
        return "{\"photo\": " + " \"" + photoData + "\"" + "}";
    }
}
