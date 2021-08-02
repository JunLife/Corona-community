package com.community.app.service;

import com.community.app.exception.ApiRequestException;
import com.community.app.model.Member;
import com.community.app.model.Post;
import com.community.app.model.Recommend;
import com.community.app.repository.MemberRepository;
import com.community.app.repository.PostRepository;
import com.community.app.repository.RecommendRepository;
import org.springframework.stereotype.Service;

@Service
public class RecommendService {

    private final MemberRepository memberRepository;
    private final RecommendRepository recommendRepository;
    private final PostRepository postRepository;

    public RecommendService(MemberRepository memberRepository, RecommendRepository recommendRepository, PostRepository postRepository) {
        this.memberRepository = memberRepository;
        this.recommendRepository = recommendRepository;
        this.postRepository = postRepository;
    }

    public void upLike(Long postId, String email) {
        try {
            Member member = memberRepository.findByEmail(email);
            Post post = postRepository.getById(postId);
            Recommend recommend = new Recommend();

            recommend.setMember(member);
            post.getRecommends().add(recommend);

            recommendRepository.save(recommend);
            postRepository.save(post);
        } catch (Exception e) {
            throw new ApiRequestException("Fail To Save Recommend");
        }
    }
}
