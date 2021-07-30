package com.community.app.service;

import com.community.app.exception.ApiRequestException;
import com.community.app.model.Comment;
import com.community.app.model.Member;
import com.community.app.model.Post;
import com.community.app.repository.CommentRepository;
import com.community.app.repository.MemberRepository;
import com.community.app.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository,
                          MemberRepository memberRepository,
                          PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.memberRepository = memberRepository;
        this.postRepository = postRepository;
    }

    public void saveComment(Map<String, String> commentJSON) {
        String email = commentJSON.get("email");
        String text = commentJSON.get("text");
        Long postId = Long.parseLong(commentJSON.get("postId"));

        try {
            Comment comment = new Comment();
            Member member = memberRepository.findByEmail(email);
            Post post = postRepository.findById(postId).get();

            comment.setText(text);
            comment.setMember(member);
            post.getComments().add(comment);

            commentRepository.save(comment);
            postRepository.save(post);
        } catch (ApiRequestException e) {
            throw new ApiRequestException("Fail To Save Comment");
        }
    }
}
