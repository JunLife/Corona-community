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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemberDetailsService implements UserDetailsService {

    PasswordEncoder passwordEncoder;
    MemberRepository memberRepository; // 이게 DAO임

    public MemberDetailsService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
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

    public void signup(Member member) {
        checkMember(member);

        member.setPassword(passwordEncoder.encode(member.getPassword()));
        memberRepository.save(member);
    }

    private void checkMember(Member member) {
        Member existMember = memberRepository.findByEmail(member.getEmail());

        if (existMember != null) {
            throw new ApiRequestException("Email Already Exists");
        }
    }

    public Member getMemberByUserEmail(String userEmail) {
        return memberRepository.findByEmail(userEmail);
    }
}
