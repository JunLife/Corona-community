package com.community.app.jwt;

import com.community.app.config.Role;
import com.community.app.utilities.CookieUtil;
import com.community.app.utilities.JWTUtil;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

public class JWTRequestFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    private final CookieUtil cookieUtil;

    public JWTRequestFilter(JWTUtil jwtUtil, CookieUtil cookieUtil) {
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Optional<Cookie> accessToken = cookieUtil.getCookie(request);

        if (accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }

        accessToken.ifPresent(token -> {
                    String jws = token.getValue();

                    if (jwtUtil.isValidToken(jws)) {
                        Claims claims = jwtUtil.getTokenBody(jws);

                        String username = claims.getSubject();

                        var authorities = (List<Map<String, String>>) claims.get("authorities");

                        Set<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities.stream()
                                .map(m -> new SimpleGrantedAuthority(m.get("authority")))
                                .collect(Collectors.toSet());

                        Authentication authentication = new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                simpleGrantedAuthorities
                        );

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } else {
                        throw new IllegalStateException(String.format("Token %s cannot be trusted", token));
                    }

                }
        );

        filterChain.doFilter(request, response);
    }
}
