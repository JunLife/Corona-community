package com.community.app.controller;

import com.community.app.model.Comment;
import com.community.app.service.CommentService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class CommentRestController {

    private final CommentService commentService;

    public CommentRestController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping(path = "/board/detail/comment")
    public HttpEntity writeComment(@RequestBody Map<String,String> commentJSON) {
        commentService.saveComment(commentJSON);

        return new ResponseEntity(HttpStatus.CREATED);
    }
}
