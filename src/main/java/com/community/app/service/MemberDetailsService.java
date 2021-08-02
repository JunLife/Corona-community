package com.community.app.service;

import com.community.app.exception.ApiRequestException;
import com.community.app.model.Member;
import com.community.app.repository.MemberRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private PostService postService;

    public MemberDetailsService(MemberRepository memberRepository, PostService postService) {
        this.memberRepository = memberRepository;
        this.postService = postService;
    }

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        try {
            Member member = memberRepository.findByEmail(userEmail);
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(member.getRole().name()));

            return new User(member.getEmail(), member.getPassword(), authorities);
        } catch (Exception e) {
            throw new ApiRequestException(String.format("userEmail %s not found", userEmail));
        }
    }

    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public String getEncodedPhoto() {
        try {
            byte[] bytes = Files.readAllBytes(Paths.get(postService.getPath() + "grade.jpg"));
            byte[] base64 = Base64.getEncoder().encode(bytes);

            return new String(base64, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new ApiRequestException("Photo Not Found");
        }
    }

    public void modifyProfile(Member member, String email) {
        Member targetMember = memberRepository.findByEmail(email);

        targetMember.setAge(member.getAge());
        targetMember.setLastName(member.getLastName());
        targetMember.setFirstName(member.getFirstName());
        targetMember.setGreeting(member.getGreeting());
        targetMember.setPhoneNumber(member.getPhoneNumber());

        memberRepository.save(targetMember);
    }
}
