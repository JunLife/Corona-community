package com.community.app.service;

import com.community.app.exception.ApiRequestException;
import com.community.app.model.Member;
import com.community.app.model.Post;
import com.community.app.repository.MemberRepository;
import com.community.app.repository.PostRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
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

    public void save(Post post, String memberEmail, MultipartFile file) throws Exception {
        Member member = memberRepository.findByEmail(memberEmail);
        post.setMember(member);
        if (!file.isEmpty()) {
            try {
                String fileName = new Date().getTime() + "_" + file.getOriginalFilename();
                File dest = new File(path + fileName);
                file.transferTo(dest);

                post.setPhotoName(fileName);
            } catch (Exception e) {
                throw new ApiRequestException("failed to upload file");
            }
        }

        postRepository.save(post);
    }

    public Member findMemberByPostId(Long id) {
        return postRepository.findById(id).get().getMember();
    }
}
