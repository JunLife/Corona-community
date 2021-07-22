package com.community.app.jwt;

import com.community.app.utilities.CookieUtil;
import com.community.app.utilities.JWTUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final CookieUtil cookieUtil ;

    public JWTUsernameAndPasswordAuthenticationFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, CookieUtil cookieUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        try {
            JWTAuthenticationRequest authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), JWTAuthenticationRequest.class);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()
            );

            Authentication authenticate = authenticationManager.authenticate(authentication);

            return authenticate;

        } catch (Exception e) {
            throw new RuntimeException("Failed At AttemptAuthentication");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        String accessToken = jwtUtil.generateToken(authResult);
        response.addCookie(cookieUtil.createAccessCookie(accessToken));

        chain.doFilter(request, response);
    }
}
