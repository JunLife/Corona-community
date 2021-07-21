package com.community.app.jwt;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JWTAuthenticationRequest {
    private String username;
    private String password;
}
