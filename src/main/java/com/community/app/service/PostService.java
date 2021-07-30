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
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
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

    public Post findById(Long id) {
        try {
            Post post = postRepository.findById(id).get();
            Member member = post.getMember();
            member.setPassword(null);
            post.setMember(member);

            if (post.getPhotoName() != null) {
                post.setPhotoData(getEncodedPhoto(post.getPhotoName()));
            }

            return post;
        } catch (ApiRequestException e) {
            throw new ApiRequestException("Post Not Found");
        }
    }

    private String getEncodedPhoto(String photoName) {
        try {
            byte[] bytes = Files.readAllBytes(Paths.get(path + photoName));
            byte[] base64 = Base64.getEncoder().encode(bytes);

            return new String(base64, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new ApiRequestException("Photo Not Found");
        }
    }

    public List<Post> getPostsByMemberEmail(String memberEmail) {
        Long memberId = memberRepository.findByEmail(memberEmail).getId();
        return postRepository.findAllByMemberId(memberId);
    }

    public Page<Post> findAllByKeyword(Pageable pageable, String keyword) {
        Page<Post> posts = postRepository.findByTitleContainingIgnoreCase(pageable, keyword);

        posts.stream().forEach(post -> {
            Member member = post.getMember();
            member.setPassword(null);
            post.setMember(member);
            post = post;
        });

        return posts;
    }
}
