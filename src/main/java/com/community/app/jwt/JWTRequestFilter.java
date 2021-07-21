package com.community.app.jwt;

import com.community.app.utilities.CookieUtil;
import com.community.app.utilities.JWTUtil;
import io.jsonwebtoken.Claims;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

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
                        // do next
                    } else {
                        // authentication again
                    }

                }
        );

        filterChain.doFilter(request, response);
    }
}
