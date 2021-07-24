package com.community.app.service;

import com.community.app.exception.ApiRequestException;
import com.community.app.model.Member;
import com.community.app.repository.MemberRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Service
public class AuthService {
    private final CookieUtil cookieUtil;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;


    public AuthService(CookieUtil cookieUtil, MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.cookieUtil = cookieUtil;
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void removeCookie(HttpServletResponse response) {
        Cookie cookie = cookieUtil.removeCookie();
        response.addCookie(cookie);
    }

    public Member getLoginMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Member member = memberRepository.findByEmail(authentication.getName());
        member.setPassword(null);

        return member;
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
}
