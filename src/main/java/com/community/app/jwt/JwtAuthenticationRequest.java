package com.community.app.jwt;

import lombok.Getter;

@Getter
public class JwtAuthenticationRequest {
    private String username;
    private String password;
}
