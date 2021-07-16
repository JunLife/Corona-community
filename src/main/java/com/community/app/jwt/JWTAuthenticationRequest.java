package com.community.app.jwt;

import lombok.Getter;

@Getter
public class JWTAuthenticationRequest {
    private String username;
    private String password;
}
