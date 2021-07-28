package com.community.app.service;

import com.community.app.exception.ApiRequestException;
import com.community.app.model.Member;
import com.community.app.model.Post;
import com.community.app.repository.MemberRepository;
import com.community.app.repository.PostRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.List;

@ConfigurationProperties(prefix = "application.file")
@Setter
@Getter
@Service
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private String path;

    public PostService(PostRepository postRepository, MemberRepository memberRepository) {
        this.postRepository = postRepository;
        this.memberRepository = memberRepository;
    }

    public void save(Post post, String memberEmail, MultipartFile file) {
        try {
            Member member = memberRepository.findByEmail(memberEmail);
            post.setMember(member);

            if (!file.isEmpty()) {
                String fileName = new Date().getTime() + "_" + file.getOriginalFilename();
                File dest = new File(path + fileName);
                file.transferTo(dest);

                post.setPhotoName(fileName);
            }

            postRepository.save(post);
        } catch (Exception e) {
            throw new ApiRequestException("failed to upload post");
        }
    }

    public List<Post> getPostsByMemberEmail(String memberEmail) {
        Long memberId = memberRepository.findByEmail(memberEmail).getId();
        return postRepository.findAllByMemberId(memberId);
    }

    public Page<Post> findAll(Pageable pageable) {
        Page<Post> posts = postRepository.findAll(pageable);

        posts.stream().forEach(post -> {
            Member member = post.getMember();
            member.setPassword(null);
            post.setMember(member);
            post = post;
        });

        return posts;
    }
}
