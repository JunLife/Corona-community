package com.community.app.controller;

//import com.community.app.service.RecommendService;
import com.community.app.service.RecommendService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RecommendRestController {

    private final RecommendService recommendService;

    public RecommendRestController(RecommendService recommendService) {
        this.recommendService = recommendService;
    }

    @PostMapping(path = "/board/detail/{id}/recommend/{email}")
    public HttpEntity upLike(@PathVariable("email") String email,
                             @PathVariable("id") Long postId) {
        recommendService.upLike(postId, email);

        return new ResponseEntity(HttpStatus.CREATED);
    }
}
