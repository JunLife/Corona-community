package com.community.app.service;

import io.jsonwebtoken.JwtException;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Optional;

@Component
public class CookieUtil {
    private final JWTUtil jwtUtil;

    public CookieUtil(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public Cookie removeCookie() {
        Cookie token = new Cookie(jwtUtil.getAccessTokenName(), "");
        token.setMaxAge(1);
        token.setHttpOnly(true);
        token.setPath("/");
        return token;
    }

    public Cookie createAccessCookie(String jws) {
        Cookie token = new Cookie(jwtUtil.getAccessTokenName(), jws);
        token.setMaxAge(jwtUtil.getAccessTokenExpiration() * 60 * 60 * 24);
        token.setHttpOnly(true);
        token.setPath("/");
        return token;
    }

    public Optional<Cookie> getCookie(HttpServletRequest request) throws JwtException {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }

        String tokenName = jwtUtil.getAccessTokenName();

        return Arrays.stream(cookies)
                .filter(cookie -> tokenName.contentEquals(cookie.getName()))
                .findFirst();
    }
}
